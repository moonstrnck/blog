'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const onScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // 스크롤이 최상단에 있으면 항상 보이기
    if (currentScrollY <= 0) {
      setIsVisible(true);
    } else {
      // 스크롤 방향에 따라 표시/숨김
      const isScrollingUp = currentScrollY < lastScrollY.current;
      setIsVisible(isScrollingUp);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { ref, isVisible };
};
