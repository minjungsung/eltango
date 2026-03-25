/***** 설정값 *****/
const SOURCE_SPREADSHEET_ID = '1D9DoveN3JkrpxUxIY2Tkp-8MGowTPGeTtNDIMZQx2nY';
const TARGET_FOLDER_ID      = '1wC4B5Zyy_DYiHMqDbd37Qybh6RiRA2rA';

// 원본 시트 머리글(일부 포함 텍스트 매칭) → 인덱스 탐지용 키워드
const HDR = {
  name:     '본명',
  nickname: '닉네임',
  phone:    '핸드폰',
  gender:   '성별',
  org:      '소속',
  age:      '연령',
  channel:  '유입',
  region:   '지역',
  worry:    '고민',
  regular:  '정규',
  training: '트레이닝',
};

const ATT_SYMBOLS = ['O','△','X','/']; // 출결 드롭다운 심볼

/*** 🔧 Debug 스위치 ***/
const DEBUG = true;

/***** 🔒 동시 실행 방지 진입점 *****/
function runMain(e) {
  // 매번 실행 시 캐시 삭제
  PropertiesService.getScriptProperties().deleteAllProperties();

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    let sheetName = '';
    try {
      if (e && e.range && typeof e.range.getSheet === 'function') {
        sheetName = e.range.getSheet().getName();
      } else if (e && e.source && typeof e.source.getActiveSheet === 'function') {
        const sh = e.source.getActiveSheet();
        sheetName = sh ? sh.getName() : '';
      }
    } catch (_) {
      sheetName = '';
    }

    generateAllClassAttendance_(sheetName);
  } finally {
    lock.releaseLock();
  }
}

/***** 메인 로직 *****/
function generateAllClassAttendance_(sourceSheetName) {
  const ss = SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
  const sheet =
    sourceSheetName
      ? (ss.getSheetByName(String(sourceSheetName)) || ss.getSheets()[0])
      : ss.getSheets()[0];

  const values = sheet.getDataRange().getValues();
  const periodLabel = sheet.getName();

  // ✅ 헤더 행 자동 탐지(타이틀/빈줄이 위에 있어도 안전)
  const headerRowIndex = findHeaderRowIndex_(values);
  const headers = values[headerRowIndex].map(v => String(v || ''));
  const rows = values.slice(headerRowIndex + 1);

  // HDR 인덱스 매핑 (출석부 필드용)
  const idx = {};
  Object.keys(HDR).forEach(k => {
    idx[k] = headers.findIndex(h => String(h || '').includes(HDR[k]));
  });

  if (DEBUG) {
    const missing = Object.entries(idx).filter(([,v]) => v < 0).map(([k]) => k);
    if (missing.length) Logger.log('MISSING HDR KEYS → %s', missing.join(', '));
    Logger.log('RUN: sourceTab="%s" headerRowIndex=%s rows=%s', sheet.getName(), headerRowIndex + 1, rows.length);
  }

  const lv5Indices = detectLv5Columns_(headers);
  const byClass = new Map();

  rows.forEach(r => {
    const name = take(r, idx.name);
    const nickname = take(r, idx.nickname);
    const phone = take(r, idx.phone);
    if (!name && !nickname) return;

    // 정규/트레이닝 + Lv.5 상급 블록만 클래스 리스트로 사용
    const lv5Text = lv5Indices.map(i => take(r, i)).filter(Boolean).join(',');
    const combined = [take(r, idx.regular), take(r, idx.training), lv5Text]
      .filter(Boolean)
      .join(',');

    const rawTokens = splitClasses_(combined);

    // Lv. 패턴 + 주요 키워드 허용
    const LV_RE = /\bL[ vV]\.?\s*\d/;
    const items = rawTokens.filter(c =>
      LV_RE.test(c) ||
      c.includes('평일반') || c.includes('주말반') ||
      c.includes('피구라') || c.includes('땅게라') || c.includes('땅게로') ||
      c.includes('밀롱가') || c.includes('크루즈') || c.includes('걷기안기')
    );

    items.forEach(item => {
      const parsed = parseClassToken_(htmlDecode_(String(item)));
      Logger.log('CLASS TOKEN: "%s" → "%s"', item, parsed.className);

      if (!parsed.className) return;

      // 기본 키(정규화)
      const classKeyBase = normalizeForKey_(parsed.className);

      // ✅ 표시명 비교도 정규화(공백/특수공백 차이로 파일 분리되는 것 방지)
      const normDisplay = s => normalizeText_(s).replace(/\s+/g, ' ').trim();

      let classKey = classKeyBase;
      if (byClass.has(classKeyBase)) {
        const existingDisplay = byClass.get(classKeyBase).__displayName || classKeyBase;
        const currentDisplay  = parsed.className;
        if (normDisplay(existingDisplay) !== normDisplay(currentDisplay)) {
          classKey = classKeyBase + '-' + shortHash_(currentDisplay);
          if (DEBUG) Logger.log('CLASS KEY COLLISION: base="%s" split="%s"', classKeyBase, classKey);
        }
      }

      if (!byClass.has(classKey)) {
        byClass.set(classKey, []);
        byClass.get(classKey).__displayName = parsed.className; // 시트 타이틀은 원본 표기 유지
      }

      byClass.get(classKey).push({
        nickname,
        name,
        phone: toPhone_(phone),
        gender: take(r, idx.gender),
        org:    take(r, idx.org),
        age:    take(r, idx.age),
        channel:take(r, idx.channel),
        region: take(r, idx.region),
        worry:  take(r, idx.worry),
      });
    });
  });

  const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
  const props  = PropertiesService.getScriptProperties();

  const periodFolder = ensureYearMonthFolderFromLabel_(folder, periodLabel);
  const periodKey = getPeriodKeyFromLabel_(periodLabel);

  // 폴더 내(직접 자식) 스프레드시트명 → 파일ID 맵
  const existingByName = loadExistingSpreadsheetNameMap_(periodFolder.getId());

  byClass.forEach((roster, classKey) => {
    const displayName = byClass.get(classKey).__displayName || classKey;

    // 파일명은 key 기반(안전 문자만)
    const fileName = sanitize_(classKey);
    const propKey  = `class_${periodKey}__${classKey}`;
    Logger.log('CREATE FILE: classKey="%s" fileName="%s" displayName="%s"', classKey, fileName, displayName);


    let file, spreadsheet;

    // 0) ScriptProperties 저장된 ID 우선
    const savedId = props.getProperty(propKey);
    if (savedId) {
      try {
        spreadsheet = SpreadsheetApp.openById(savedId);
        file = DriveApp.getFileById(savedId);
        try { periodFolder.addFile(file); } catch (_) {}
      } catch (_) {
        props.deleteProperty(propKey);
        spreadsheet = null;
        file = null;
      }
    }

    // 1) 이름 맵으로 찾기
    if (!spreadsheet) {
      const existingId = existingByName[fileName];
      if (existingId) {
        try {
          spreadsheet = SpreadsheetApp.openById(existingId);
          file = DriveApp.getFileById(existingId);
          props.setProperty(propKey, existingId);
        } catch (_) {
          delete existingByName[fileName];
          spreadsheet = null;
          file = null;
        }
      }
    }

    // 2) 없으면 생성
    if (!spreadsheet) {
      const ssNew = SpreadsheetApp.create(fileName);
      const fid = ssNew.getId();
      spreadsheet = ssNew;
      file = DriveApp.getFileById(fid);

      try { periodFolder.addFile(file); } catch (_) {}
      existingByName[fileName] = fid;
      props.setProperty(propKey, fid);
    }

    // 출석부 구성/추가 + 중복정리
    buildOrAppendAttendance_(spreadsheet, displayName, roster);

    // 결과 파일은 periodFolder로 정리(중복 위치 제거)
    try { periodFolder.addFile(file); } catch (_) {}
    try { folder.removeFile(file); } catch (_) {}
    removeFromRoot_(file);
  });

  if (DEBUG) Logger.log('DONE: classes=%s period="%s"', byClass.size, periodKey);
}

/***** 출석부 생성/추가 *****/
function buildOrAppendAttendance_(ss, className, roster) {
  let sheet = ss.getSheetByName('출석부');

  // 시트가 없으면 생성/초기화
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName('출석부');
  }

  // ✅ 헤더/고정영역은 매번 보정(예전 파일이 깨져있어도 복구)
  ensureAttendanceLayout_(sheet, className);

  const lastRow = sheet.getLastRow();
  const existing =
    lastRow > 5
      ? sheet.getRange(6, 1, lastRow - 5, 3).getValues() // 닉네임, 본명, 핸드폰
      : [];

  // 중복 방지: 시트 내 기존 + 이번 실행 내 pending
  const existingKeys = new Set(existing.map(r => personKey_(r[1], r[0], r[2])));
  const pendingKeys  = new Set();
  const newRows = [];

  roster.forEach(r => {
    const key = personKey_(r.name, r.nickname, r.phone);
    if (!existingKeys.has(key) && !pendingKeys.has(key)) {
      newRows.push([
        r.nickname,
        r.name,
        r.phone,
        r.gender,
        r.org,
        '','','','','',     // 1~5주
        '',                 // 히스토리
        r.age,
        r.channel,
        r.region,
        r.worry,
        ''                  // 강사 코멘트
      ]);
      pendingKeys.add(key);
    }
  });

  if (newRows.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, newRows[0].length)
      .setValues(newRows);
    SpreadsheetApp.flush();
  }

  // ✅ append 여부와 무관하게 항상 dedupe(기존에 쌓인 중복도 정리)
  const dedupeResult = dedupeAttendanceSheetKeepFirst_(sheet);
  if (DEBUG && dedupeResult.deleted > 0) {
    Logger.log('DEDUPE "%s" deleted=%s kept=%s', className, dedupeResult.deleted, dedupeResult.kept);
  }

  // 출결 드롭다운 재적용(행 감소/증가 반영)
  applyAttendanceValidation_(sheet);

  // 다른 시트 제거
  const sheets = ss.getSheets();
  if (sheets.length > 1) {
    sheets.forEach(s => {
      if (s.getName() !== '출석부') {
        try { ss.deleteSheet(s); } catch (_) {}
      }
    });
  }
}

/***** ✅ 기존 파일까지 한 번에 중복 정리(수동 실행용) *****/
function cleanupCurrentPeriodAttendance() {
  const sourceSs = SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
  const periodLabel = sourceSs.getSheets()[0].getName(); // 기준: 첫 탭 이름
  cleanupPeriodAttendanceByLabel_(periodLabel);
}

function cleanupPeriodAttendanceByLabel_(periodLabel) {
  const rootFolder = DriveApp.getFolderById(TARGET_FOLDER_ID);
  const periodFolder = ensureYearMonthFolderFromLabel_(rootFolder, periodLabel);

  const q =
    `'${periodFolder.getId()}' in parents and ` +
    `mimeType = 'application/vnd.google-apps.spreadsheet' and ` +
    `trashed = false`;

  const it = DriveApp.searchFiles(q);

  let filesScanned = 0;
  let totalDeleted = 0;

  while (it.hasNext()) {
    const f = it.next();
    filesScanned++;

    try {
      const ss = SpreadsheetApp.openById(f.getId());
      const sh = ss.getSheetByName('출석부');
      if (!sh) continue;

      const res = dedupeAttendanceSheetKeepFirst_(sh);
      if (res.deleted > 0) {
        totalDeleted += res.deleted;
        applyAttendanceValidation_(sh);
        if (DEBUG) Logger.log('CLEAN "%s" deleted=%s', f.getName(), res.deleted);
      }
    } catch (e) {
      Logger.log('CLEAN FAIL "%s" err=%s', f.getName(), e);
    }
  }

  Logger.log('CLEANUP DONE period="%s" files=%s totalDeleted=%s', periodLabel, filesScanned, totalDeleted);
}

/***** 중복 제거(맨 처음 것만 남김) *****/
function dedupeAttendanceSheetKeepFirst_(sheet) {
  const last = sheet.getLastRow();
  if (last <= 5) return { deleted: 0, kept: 0 };

  // A~C: 닉네임, 본명, 핸드폰번호
  const data = sheet.getRange(6, 1, last - 5, 3).getValues();

  const seen = new Set();
  const rowsToDelete = [];

  for (let i = 0; i < data.length; i++) {
    const [nick, name, phone] = data[i];
    const key = personKey_(name, nick, phone);
    if (seen.has(key)) rowsToDelete.push(6 + i);
    else seen.add(key);
  }

  rowsToDelete.reverse().forEach(rn => sheet.deleteRow(rn));
  SpreadsheetApp.flush();

  return { deleted: rowsToDelete.length, kept: data.length - rowsToDelete.length };
}

/***** 레이아웃/검증 *****/
function ensureAttendanceLayout_(sheet, className) {
  sheet.getRange(1, 1)
    .setValue(className)
    .setFontSize(16)
    .setFontWeight('bold');

  // 강사 2줄(헤더 위)
  sheet.getRange(3, 5).setValue('남자강사');
  sheet.getRange(4, 5).setValue('여자강사');

  const headers = [
    '닉네임','본명','핸드폰번호','성별','소속',
    '1주차','2주차','3주차','4주차','5주차',
    '히스토리','연령','유입경로','지역','수강생 고민','강사 코멘트'
  ];

  sheet.getRange(5, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(5);
  sheet.setFrozenColumns(5);
}

function applyAttendanceValidation_(sheet) {
  const lastDataRow = sheet.getLastRow();
  if (lastDataRow < 4) return;

  const dv =
    SpreadsheetApp.newDataValidation()
      .requireValueInList(ATT_SYMBOLS, true)
      .build();

  // 강사 2줄(3~4행)
  sheet.getRange(3, 6, 2, 5)
    .setDataValidation(dv)
    .setHorizontalAlignment('center');

  // 수강생(6행~마지막행)
  if (lastDataRow >= 6) {
    sheet.getRange(6, 6, lastDataRow - 5, 5)
      .setDataValidation(dv)
      .setHorizontalAlignment('center');
  }
}

/***** 유틸 *****/
function findHeaderRowIndex_(values) {
  const maxScan = Math.min(values.length, 30);
  for (let r = 0; r < maxScan; r++) {
    const row = values[r].map(v => String(v || ''));
    const hasNickname = row.some(h => h.includes(HDR.nickname));
    const hasName     = row.some(h => h.includes(HDR.name));
    const hasPhone    = row.some(h => h.includes(HDR.phone));
    if (hasNickname && (hasName || hasPhone)) return r;
  }
  return 0;
}

// ‘Lv.5 상급’ 블록(머리열 + 뒤따르는 요일열) 인덱스 반환
function detectLv5Columns_(headers) {
  const idxLv5Head = headers.findIndex(h =>
    /Lv\.?\s*5\s*상급/i.test(String(h)) || String(h).includes('Lv.5 상급')
  );
  if (idxLv5Head < 0) return [];

  const indices = [idxLv5Head];
  for (let i = idxLv5Head + 1; i < headers.length; i++) {
    const h = String(headers[i] || '').trim();
    if (/^(월|화|수|목|금|토|일)$/.test(h)) indices.push(i);
    else break;
  }
  return indices;
}

function take(row, index) {
  if (index == null || index < 0) return '';
  const v = row[index];
  return v == null ? '' : String(v).trim();
}

function splitClasses_(text) {
  return String(text || '')
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function htmlDecode_(s) {
  return String(s || '')
    .replace(/&amp;/g,'&')
    .replace(/&lt;/g,'<')
    .replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'");
}

function normalizeText_(v) {
  let s = v == null ? '' : String(v);
  try { s = s.normalize('NFKC'); } catch (_) {}
  return s
    .replace(/[\u200B-\u200D\uFEFF]/g, '')      // zero-width
    .replace(/[\u00A0\u202F\u3000]/g, ' ')      // NBSP류
    .replace(/\s+/g, ' ')
    .trim();
}

function phoneToDigits_(phone) {
  if (phone == null) return '';

  if (typeof phone === 'number') {
    if (!Number.isFinite(phone)) return '';
    phone = Utilities.formatString('%.0f', phone);
  }

  const s = normalizeText_(phone);
  let digits = s.replace(/[^\d]/g, '');

  // 앞 0 날아간 케이스 보정
  if (digits.length === 10 && digits[0] !== '0') digits = '0' + digits;

  return digits;
}

// 사람 식별 키(결정적이어야 함: 중복 방지/제거가 안정적으로 동작)
function personKey_(name, nickname, phone) {
  const nm   = normalizeText_(name);
  const nick = normalizeText_(nickname);
  const p    = phoneToDigits_(phone);

  // 폰이 있으면 폰 중심
  if (p) return `${nm || nick}__${p}`;

  // 폰이 없으면 name+nick 기반(둘 중 하나만 있으면 그 값으로)
  return `${nm}__${nick}__NO_PHONE`;
}

function toPhone_(v) {
  const digits = phoneToDigits_(v);

  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (digits.length === 10) {
    if (digits.startsWith('02')) return digits.replace(/(02)(\d{4})(\d{4})/, '$1-$2-$3');
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  return normalizeText_(v);
}

function parseClassToken_(token) {
  const t = normalizeText_(htmlDecode_(String(token || '')))
    .replace(/[：︰꞉։﹕⩴ː]/g, ':');

  const className = t
    .split(':')[0]
    .replace(/\(.*?\)/g,'')
    .replace(/~.*$/g,'')
    .replace(/\s+/g,' ')
    .trim();

  return { className };
}

function normalizeForKey_(name) {
  return normalizeText_(htmlDecode_(String(name || '')
    .replace(/[：︰꞉։﹕⩴ː]/g, ':')
    .replace(/\(.*?\)/g,'')
    .replace(/~.*$/g,'')
    .replace(/\s+/g,' ')
  ));
}

function shortHash_(s) {
  let h = 0;
  const str = String(s || '');
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36).slice(0, 7);
}

function sanitize_(s) {
  return normalizeText_(String(s || ''))
    .replace(/[\\\/:*?"<>|#%{}$!@+=`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 128);
}

function removeFromRoot_(file) {
  try {
    const root = DriveApp.getRootFolder();
    root.removeFile(file);
  } catch (_) {}
}

// 폴더 내(직접 자식) 스프레드시트명 → 파일ID 맵
function loadExistingSpreadsheetNameMap_(folderId) {
  const q =
    `'${folderId}' in parents and ` +
    `mimeType = 'application/vnd.google-apps.spreadsheet' and ` +
    `trashed = false`;

  const it = DriveApp.searchFiles(q);
  const map = {};
  while (it.hasNext()) {
    const f = it.next();
    map[f.getName()] = f.getId();
  }
  return map;
}

/***** 폴더 관련 유틸 *****/
function ensureChildFolderByName_(parentFolder, childName) {
  const name = String(childName || '').trim();
  if (!name) throw new Error('ensureChildFolderByName_: childName is empty');

  const it = parentFolder.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return parentFolder.createFolder(name);
}

function ensureYearMonthFolderFromLabel_(targetFolder, label) {
  const parsed = parseYearMonthFromLabel_(label);
  if (parsed) {
    const yearFolder = ensureChildFolderByName_(targetFolder, parsed.year);
    return ensureChildFolderByName_(yearFolder, parsed.month);
  }

  const safe = sanitize_(String(label || '').trim()) || 'unknown';
  return ensureChildFolderByName_(targetFolder, safe);
}

function parseYearMonthFromLabel_(label) {
  const raw = String(label || '').trim();
  if (!raw) return null;

  const ko = raw.match(/(\d{2,4})\s*년\s*(\d{1,2})\s*월/);
  if (ko) {
    let yearNum = Number(ko[1]);
    const monthInt = Number(ko[2]);
    if (Number.isFinite(yearNum) && yearNum < 100) yearNum = 2000 + yearNum;
    if (
      Number.isFinite(yearNum) && yearNum >= 1900 && yearNum <= 2999 &&
      Number.isFinite(monthInt) && monthInt >= 1 && monthInt <= 12
    ) {
      return { year: String(yearNum), month: String(monthInt).padStart(2, '0') };
    }
  }

  const m = raw.match(/(\d{4})\s*(?:\/|-|\.)\s*(\d{1,2})/);
  if (m) {
    const year = m[1];
    const monthInt = Number(m[2]);
    if (Number.isFinite(monthInt) && monthInt >= 1 && monthInt <= 12) {
      return { year, month: String(monthInt).padStart(2, '0') };
    }
  }

  return null;
}

function getPeriodKeyFromLabel_(label) {
  const parsed = parseYearMonthFromLabel_(label);
  if (parsed) return `${parsed.year}-${parsed.month}`;
  return sanitize_(String(label || '').trim()) || 'unknown';
}

/***** 트리거 설치 *****/
function setupAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const sourceSs = SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);

  const hasFormSubmit = triggers.some(t =>
    t.getHandlerFunction() === 'runMain' &&
    t.getTriggerSource && t.getTriggerSource() === ScriptApp.TriggerSource.SPREADSHEETS &&
    t.getEventType && t.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT
  );

  if (!hasFormSubmit) {
    try {
      ScriptApp.newTrigger('runMain')
        .forSpreadsheet(sourceSs)
        .onFormSubmit()
        .create();
    } catch (e) {
      Logger.log('TRIGGER CREATE FAIL (onFormSubmit for SOURCE_SPREADSHEET_ID): %s', e);
      throw e;
    }
  }

}