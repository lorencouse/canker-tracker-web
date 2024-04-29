import React from "react";

interface InputNumberFieldProps {
    label: string;
    forLabel: string;
    options: number[];
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}




export function InputNumberField( {label, forLabel, options, value, onChange}:InputNumberFieldProps ) {

    return (

    <div className="md:flex md:items-center justify-between mb-6">
    <div className="md:w-7/8">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={forLabel}>
        {label}
      </label>
    </div>
    <div className="md:w-1/8">
                    <select
                    name={forLabel}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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

    )
}

interface InputCheckboxProps {
    label: string;
    forLabel: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputCheckboxField( {label, forLabel, value, onChange}:InputCheckboxProps ) {

    return (

    <div className="md:flex items-center justify-between mb-6">
    <div className="md:w-7/8 text-left">
      <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 text-left" htmlFor={forLabel}>
        {label}
      </label>
    </div>
    <div className="md:w-1/8">

            <label className="inline-flex items-center cursor-pointer mr-0">
                <span className="mr-3 text-md font-medium text-gray-900 dark:text-gray-500">{`${value ? "Yes" : "No"}`}</span>

                <input
                    type="checkbox"
                    name={forLabel}
                    checked={value}
                    onChange={onChange}
                    value=""
                    className="sr-only peer"
                />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
    </div>
    </div>

    )
}

export function InputLabel({label, forLabel}:{label: string; forLabel:string}) {
    return (
        <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 text-left" htmlFor={forLabel}>
        {label}
      </label>
    )
}

