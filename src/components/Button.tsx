import React from "react";

interface ButtonProps {
    label: string;
    action: () => void;
};

export default function Button( { label, action}:ButtonProps ) {

    return (
        <>
            <button onClick={ action } className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{label}</button>
        </>
    )
}