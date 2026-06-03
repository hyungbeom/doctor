"use client";

import { useEffect, useState } from "react";
import styles from "./popup.module.css";
import {
  samplePopups,
  hidePopupForOneDay,
  isPopupHidden,
  type EventPopupData,
} from "@/data/popups";

function EventPopupCard({
  data,
  onClose,
}: {
  data: EventPopupData;
  onClose: () => void;
}) {
  const [hideToday, setHideToday] = useState(false);

  const handleConfirm = () => {
    if (hideToday) {
      hidePopupForOneDay(data.storageKey);
    }
    onClose();
  };

  return (
    <div className={styles.modal} role="dialog" aria-modal="true" aria-label={data.headline.replace("\n", " ")}>
      <div
        className={styles.modalBody}
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className={styles.modalOverlay} aria-hidden />
        <div className={styles.modalInner}>
          <header className={styles.modalHeader}>
            <span className={styles.modalLogo}>{data.logo}</span>
            <span className={styles.modalBrand}>{data.brand}</span>
          </header>

          <h2 className={styles.modalTitle}>{data.headline}</h2>

          <div className={styles.modalMeta}>
            <span className={styles.modalBadge}>{data.badge}</span>
            <span className={styles.modalDate}>{data.date}</span>
          </div>
          <p className={styles.modalNote}>{data.note}</p>
          <hr className={styles.modalDivider} />

          <ul className={styles.priceList}>
            {data.prices.map((item) => (
              <li key={item.label} className={styles.priceRow}>
                <span className={styles.priceLabel}>{item.label}</span>
                <span className={styles.priceDots} aria-hidden />
                <span className={styles.priceValue}>{item.price}</span>
              </li>
            ))}
          </ul>
          <p className={styles.vatNote}>{data.vatNote}</p>

          <div className={styles.modalDesc}>
            {data.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <a href={data.ctaHref} className={styles.modalCtaBar}>
            {data.ctaText} ⇒
          </a>
        </div>
      </div>

      <footer className={styles.modalFooter}>
        <label className={styles.hideCheck}>
          <input
            type="checkbox"
            checked={hideToday}
            onChange={(e) => setHideToday(e.target.checked)}
          />
          1일 동안 보지 않기
        </label>
        <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>
          확인
        </button>
      </footer>
    </div>
  );
}

const MOBILE_POPUP_MQ = "(max-width: 767px)";

export default function PagePopups() {
  const [visible, setVisible] = useState<boolean[]>([]);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_POPUP_MQ);
    const syncMobile = () => setIsMobile(mq.matches);
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    if (window.matchMedia(MOBILE_POPUP_MQ).matches) {
      setVisible(samplePopups.map(() => false));
      setReady(true);
      return;
    }
    setVisible(samplePopups.map((popup) => !isPopupHidden(popup.storageKey)));
    setReady(true);
  }, []);

  const anyOpen = visible.some(Boolean);

  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOpen]);

  const closePopup = (index: number) => {
    setVisible((prev) => prev.map((open, i) => (i === index ? false : open)));
  };

  const closeAll = () => {
    setVisible(samplePopups.map(() => false));
  };

  if (!ready || isMobile || !anyOpen) {
    return null;
  }

  return (
    <div className={styles.popupRoot} role="presentation">
      <div className={styles.popupDim} onClick={closeAll} aria-hidden />
      <div className={styles.popupGroup}>
        {samplePopups.map((popup, index) =>
          visible[index] ? (
            <EventPopupCard key={popup.id} data={popup} onClose={() => closePopup(index)} />
          ) : null,
        )}
      </div>
    </div>
  );
}
