"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/app/products/productDetail.module.css";
import type { FlatProduct } from "@/data/productCatalog";
import { getProductImage } from "@/lib/productImage";

const DRAG_THRESHOLD_PX = 6;

type ProductImageCarouselProps = {
  items: FlatProduct[];
};

export default function ProductImageCarousel({ items }: ProductImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });

  const slideCount = items.length;
  const canSlide = slideCount > 1;

  const snapToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const clamped = Math.max(0, Math.min(index, slideCount - 1));
    const slideWidth = viewport.clientWidth;
    viewport.scrollTo({ left: clamped * slideWidth, behavior });
    setActiveIndex(clamped);
  }, [slideCount]);

  const syncIndexFromScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.clientWidth === 0) return;
    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setActiveIndex(Math.max(0, Math.min(index, slideCount - 1)));
  }, [slideCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleResize = () => snapToIndex(activeIndex, "auto");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, snapToIndex]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canSlide || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || event.pointerId !== drag.pointerId) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) {
      drag.moved = true;
    }
    if (drag.moved) {
      viewport.scrollLeft = drag.scrollLeft - delta;
    }
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || event.pointerId !== drag.pointerId) return;

    const viewport = viewportRef.current;
    dragRef.current.active = false;

    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (drag.moved) {
      syncIndexFromScroll();
      const index = viewport
        ? Math.round(viewport.scrollLeft / viewport.clientWidth)
        : activeIndex;
      snapToIndex(index);
    }
  };

  return (
    <div className={styles.galleryCarousel}>
      <div
        ref={viewportRef}
        className={`${styles.carouselViewport} ${canSlide ? styles.carouselDraggable : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="제품 이미지"
        tabIndex={canSlide ? 0 : undefined}
        onScroll={canSlide ? syncIndexFromScroll : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (!canSlide) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            snapToIndex(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            snapToIndex(activeIndex + 1);
          }
        }}
      >
        <ul className={styles.carouselTrack} aria-live="polite">
          {items.map((item, index) => (
            <li
              key={item.productId}
              className={styles.carouselSlide}
              aria-hidden={index !== activeIndex}
              aria-label={`${index + 1} / ${slideCount}`}
            >
              <div className={styles.carouselSlideInner}>
                <span className={styles.galleryBadge}>Alpexmedi 스펙 검증 완료</span>
                <span className={styles.galleryBrand}>Alpexmedi</span>
                <Image
                  src={getProductImage(item.productId)}
                  alt={item.productName}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 960px) 640px, 100vw"
                  className={styles.galleryImg}
                  draggable={false}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {canSlide && (
        <div className={styles.carouselDots} role="tablist" aria-label="이미지 선택">
          {items.map((item, index) => (
            <button
              key={item.productId}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${index + 1}번째 이미지`}
              className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ""}`}
              onClick={() => snapToIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
