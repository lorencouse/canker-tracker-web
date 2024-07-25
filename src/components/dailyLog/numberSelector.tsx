import type React from 'react';

const NumberSelector: React.FC<{
  title: string;
  arrayLength: number;
  name: string;
  logValue: number;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ title, arrayLength, name, logValue, inputChangeHandler }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="scrollbar-hide mt-2 flex h-12 max-w-full items-center gap-2 overflow-scroll pl-2 align-middle">
        {[...Array(arrayLength).keys()].map((num) => (
          <label key={num} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={num}
              checked={Number(logValue) === num} // Convert logValue to a number
              onChange={inputChangeHandler}
              className="hidden"
            />
            <div
              className={`flex h-8 w-8 items-center justify-center rounded border-2 hover:scale-125 ${
                Number(logValue) === num // Convert logValue to a number
                  ? 'scale-125 border-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {num}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default NumberSelector;
