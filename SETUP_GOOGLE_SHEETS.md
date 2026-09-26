# Google Sheets 등록 백엔드 설정

등록 폼 제출 시 Google Sheets에 데이터를 직접 저장합니다.

## 1. Apps Script 코드

스프레드시트 → 확장 프로그램 → Apps Script → 코드 전부 교체:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.openById("1_eUgTqS5Kiw2nVkul3NVfD8nXRptU8ocIUgqEdMVjBg");
  var sheet = ss.getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.phone, data.memo, data.source]);

  // 이메일 알림 — 새 신청이 들어오면 즉시 이메일로 알려줍니다
  var to = "fishlow0@daum.net"; // 받을 이메일 주소 (변경 가능)
  var subject = "[엘땅고] 새 상담 신청: " + data.name;
  var body = "이름: " + data.name + "\n"
           + "전화번호: " + data.phone + "\n"
           + "메모: " + (data.memo || "없음") + "\n"
           + "출처: " + (data.source || "-") + "\n"
           + "시간: " + new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
  MailApp.sendEmail(to, subject, body);

  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}
```

## 2. 배포

저장 → 배포 → 새 배포 → 웹 앱 → 실행 주체: 본인, 액세스: 모든 사용자 → 배포

> 코드 수정 후에는 반드시 **새 버전으로 재배포**해야 반영됩니다.

## 3. 환경변수

`.env.local`:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_KAKAO_OPENCHAT_URL=https://open.kakao.com/o/gzAMRBrg
```

## 4. 네이버 지도 (선택)

[Naver Cloud Console](https://console.ncloud.com/naver-service/application)에서 Client ID 발급 후:
```
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=YOUR_CLIENT_ID
```
미설정 시 Google Maps embed로 자동 대체됩니다.
