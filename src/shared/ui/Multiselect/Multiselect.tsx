import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckIcon } from '@heroicons/react/16/solid';

type MultiselectProps<T extends { id: string | number; label: string }> = {
  value: T[];
  options: T[];
  label?: string;
  placeholder?: string;
  width?: string | number;
  chipTemplate?: (chip: T) => ReactNode;
  optionTemplate?: (option: T) => ReactNode;
  onChange: (val: T[]) => void;
};

export const Multiselect = <T extends { id: string | number; label: string }>({
  value = [],
  options = [],
  label,
  placeholder = 'Please select',
  width = '100%',
  chipTemplate,
  optionTemplate,
  onChange,
}: MultiselectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const selectedOptions = useMemo(
    () => new Set(value.map((val) => val.id)),
    [value],
  );

  const toggleOption = (option: T) => {
    if (selectedOptions.has(option.id)) {
      onChange(value.filter((val) => val.id !== option.id));
    } else {
      onChange([...value, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!panelRef.current) {
        return;
      }

      if (!panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={panelRef} className="relative" style={{ width }}>
      <button
        type="button"
        className="min-h-9 w-full rounded-md bg-white px-3 py-1.5 text-left text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 dark:bg-gray-800 dark:text-white dark:outline-gray-700"
        onClick={() => setIsOpen((open) => !open)}
      >
        <div className="inline-flex flex-wrap items-center gap-2">
          {label && <span className="mr-2 font-medium">{label}: </span>}
          {value.length ? (
            value.map((val) => (
              <span key={val.id} className="inline-flex">
                {chipTemplate ? chipTemplate(val) : val.label}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-50 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg outline-1 outline-black/5 dark:bg-gray-800 dark:outline-gray-700">
          {options.map((option) => (
            <li
              key={option.id}
              className="flex items-center justify-between px-3 py-2 select-none hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => toggleOption(option)}
            >
              {optionTemplate ? optionTemplate(option) : option.label}
              {selectedOptions.has(option.id) && (
                <CheckIcon className="size-4" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
