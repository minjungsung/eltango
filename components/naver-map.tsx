"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          el: HTMLElement,
          opts: {
            center: InstanceType<typeof window.naver.maps.LatLng>;
            zoom: number;
          }
        ) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: {
          position: InstanceType<typeof window.naver.maps.LatLng>;
          map: unknown;
        }) => unknown;
      };
    };
  }
}

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

// 엘땅고 좌표: 서초구 주흥길 12
const LAT = 37.4835;
const LNG = 127.0085;

export function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID || !mapRef.current) return;

    // Avoid loading script twice
    const existingScript = document.querySelector(
      'script[src*="openapi.map.naver.com"]'
    );

    function initMap() {
      if (!mapRef.current || !window.naver) return;
      const center = new window.naver.maps.LatLng(LAT, LNG);
      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom: 17,
      });
      new window.naver.maps.Marker({ position: center, map });
    }

    if (existingScript && window.naver?.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      // Don't remove script — other instances might use it
    };
  }, []);

  if (!NAVER_MAP_CLIENT_ID) {
    // Fallback: Google Maps embed if no Naver API key configured
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1582.5!2d127.005!3d37.483!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e7f01b0d29%3A0x66251633371a6c99!2sEl+Tango+Cafe!5e0!3m2!1sko!2skr"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="엘땅고 위치"
        allowFullScreen
      />
    );
  }

  return <div ref={mapRef} className="h-full w-full" />;
}
