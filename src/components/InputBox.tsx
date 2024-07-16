import type React from 'react';

interface InputNumberFieldProps {
  label: string;
  forLabel: string;
  options: number[];
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function InputNumberField({
  label,
  forLabel,
  options,
  value,
  onChange,
}: InputNumberFieldProps) {
  return (
    <div className="mb-6 justify-between md:flex md:items-center">
      <div className="md:w-7/8">
        <label
          className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
          htmlFor={forLabel}
        >
          {label}
        </label>
      </div>
      <div className="md:w-1/8">
        <select
          name={forLabel}
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface InputCheckboxProps {
  label: string;
  forLabel: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputCheckboxField({
  label,
  forLabel,
  value,
  onChange,
}: InputCheckboxProps) {
  return (
    <div className="mb-6 items-center justify-between md:flex">
      <div className="md:w-7/8 text-left">
        <label
          className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0"
          htmlFor={forLabel}
        >
          {label}
        </label>
      </div>
      <div className="md:w-1/8">
        <label className="mr-0 inline-flex cursor-pointer items-center">
          <span className="text-md mr-3 font-medium text-gray-900 dark:text-gray-500">{`${value ? 'Yes' : 'No'}`}</span>

          <input
            type="checkbox"
            name={forLabel}
            checked={value}
            onChange={onChange}
            value=""
            className="peer sr-only"
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full" />
        </label>
      </div>
    </div>
  );
}

export function InputLabel({
  label,
  forLabel,
}: {
  label: string;
  forLabel: string;
}) {
  return (
    <label
      className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0"
      htmlFor={forLabel}
    >
      {label}
    </label>
  );
}
