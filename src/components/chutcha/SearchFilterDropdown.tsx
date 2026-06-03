"use client";

import styles from "@/app/chutcha.module.css";
import { shortLabel } from "@/data/productCatalog";

export type DropdownOption = {
  id: string;
  label: string;
};

type SearchFilterDropdownProps = {
  placeholder: string;
  value: DropdownOption | null;
  options: DropdownOption[];
  disabled?: boolean;
  isOpen: boolean;
  showCategoryIcon?: boolean;
  onToggle: () => void;
  onSelect: (option: DropdownOption) => void;
};

export default function SearchFilterDropdown({
  placeholder,
  value,
  options,
  disabled = false,
  isOpen,
  showCategoryIcon = false,
  onToggle,
  onSelect,
}: SearchFilterDropdownProps) {
  const displayLabel = value ? shortLabel(value.label) : placeholder;

  return (
    <div
      className={styles.treeBtnWrap}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className={`${styles.treeBtn} ${showCategoryIcon ? styles.treeBtnCategory : ""} ${value ? styles.treeBtnSelected : ""} ${disabled ? styles.treeBtnDisabled : ""}`}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={value?.label ?? placeholder}
        onClick={(event) => {
          event.stopPropagation();
          if (!disabled) {
            onToggle();
          }
        }}
      >
        <span>{displayLabel}</span>
      </button>
      {isOpen && !disabled && (
        <ul className={styles.categoryDropdown} role="listbox" aria-label={placeholder}>
          {options.map((option) => (
            <li key={option.id} role="option">
              <button
                type="button"
                className={`${styles.categoryDropdownItem} ${value?.id === option.id ? styles.categoryDropdownItemActive : ""}`}
                aria-selected={value?.id === option.id}
                onClick={() => onSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
