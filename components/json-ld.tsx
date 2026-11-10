import React from 'react';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DanceSchool',
    name: '엘땅고 강남본점 (El Tango)',
    alternateName: '서울탱고아카데미',
    description: '17년 전통 강남 아르헨티나 탱고 전문 아카데미. 2023 로마 세계대회 챔피언 이인경 원장 직강. 성인 직장인 취미, 5060 크루즈 선상 파티 대비반, 원데이 체험 클래스.',
    url: 'https://eltango.vercel.app',
    telephone: '+82-10-2415-0563',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '서초구 주흥길 12 2층',
      addressLocality: '서초구',
      addressRegion: '서울특별시',
      postalCode: '06544',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5055,
      longitude: 127.0245,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '23:00',
      },
    ],
    priceRange: '₩₩',
    founder: {
      '@type': 'Person',
      name: '이인경',
      jobTitle: '대표원장',
      description: '24년 경력 탱고 마에스트라, 전 KBS 방송작가, 2023 로마 세계탱고대회 챔피언',
    },
    sameAs: [
      'https://m.place.naver.com/place/20526245',
      'https://cafe.naver.com/eltango2009',
      'https://www.instagram.com/eltango_seoultangoacademy',
      'https://www.youtube.com/@seoultango',
      'https://dulcenaleo.com/eltango',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
