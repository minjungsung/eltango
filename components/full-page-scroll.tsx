"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface FullPageScrollProps {
  sectionIds: string[];
  children: ReactNode[];
}

// Custom event name for cross-component communication
const NAV_EVENT = "fp-navigate";

/** Dispatch from anywhere (e.g. Navbar) to tell the active FullPageScroll to navigate. */
export function navigateToSection(hash: string) {
  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: hash }));
}

export function FullPageScroll({ sectionIds, children }: FullPageScrollProps) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef(0);
  const total = children.length;

  const sectionIdsRef = useRef(sectionIds);
  sectionIdsRef.current = sectionIds;

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current) return;
      const clamped = Math.max(0, Math.min(index, total - 1));
      if (clamped === currentRef.current) return;
      animatingRef.current = true;
      currentRef.current = clamped;
      setCurrent(clamped);
      setTimeout(() => {
        animatingRef.current = false;
      }, 800);
    },
    [total],
  );

  const goToHash = useCallback(
    (hash: string) => {
      if (!hash) return;
      const idx = sectionIdsRef.current.indexOf(hash);
      if (idx !== -1) goTo(idx);
    },
    [goTo],
  );

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animatingRef.current) return;
      if (e.deltaY > 20) goTo(currentRef.current + 1);
      else if (e.deltaY < -20) goTo(currentRef.current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo]);

  // Touch
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (delta > 50) goTo(currentRef.current + 1);
      else if (delta < -50) goTo(currentRef.current - 1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(currentRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, total]);

  // Listen for custom nav events + hashchange + initial hash
  useEffect(() => {
    const onNav = (e: Event) => {
      const hash = (e as CustomEvent<string>).detail;
      goToHash(hash);
    };

    const onHashChange = () => {
      goToHash(window.location.hash.replace("#", ""));
    };

    window.addEventListener(NAV_EVENT, onNav);
    window.addEventListener("hashchange", onHashChange);

    // Handle initial hash on mount
    if (window.location.hash) {
      goToHash(window.location.hash.replace("#", ""));
    }

    return () => {
      window.removeEventListener(NAV_EVENT, onNav);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [goToHash]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="fp-container">
        <div
          className="fp-wrapper"
          style={{ transform: `translateY(-${current * 100}%)` }}
        >
          {children.map((child, i) => (
            <div key={sectionIds[i]} id={sectionIds[i]} className="fp-section">
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
