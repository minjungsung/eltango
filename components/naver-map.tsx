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
    // Fallback: static map image linking to Naver Maps
    return (
      <a
        href="https://naver.me/xdp3zeag"
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-full w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/map.png"
          alt="엘땅고 위치"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/40 to-transparent">
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow">
            네이버 지도에서 보기 →
          </span>
        </div>
      </a>
    );
  }

  return <div ref={mapRef} className="h-full w-full" />;
}
