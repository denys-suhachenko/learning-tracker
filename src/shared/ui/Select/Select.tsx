import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export const Select = ({
  id,
  name,
  options,
  value,
  defaultValue,
  placeholder = 'Select option',
  disabled,
  onChange,
}: SelectProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? '',
  );

  const selectedValue = value !== undefined ? value : uncontrolledValue;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) {
      return;
    }

    if (value === undefined) {
      setUncontrolledValue(option.value);
    }

    onChange?.(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <input
        id={id}
        type="hidden"
        name={name}
        value={selectedValue}
        disabled={disabled}
      />

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          className="flex w-full items-center justify-between rounded-sm bg-white/5 px-3 py-1.5 text-sm leading-6 outline-1 outline-gray-300 dark:text-white dark:outline-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={clsx(
              selectedOption
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400',
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-sm bg-white py-1 shadow-lg outline-1 outline-gray-300 dark:text-white dark:outline-gray-700">
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  'flex w-full items-center px-3 py-2 text-left text-sm select-none',
                  option.disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-200',
                  option.value === selectedValue && 'bg-gray-200',
                )}
                onClick={() => handleSelect(option)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
