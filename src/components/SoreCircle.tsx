import React from "react";

interface SoreCircle {
    id: string;
    x: number;
    y: number;
    size: number;
    pain: number;
}

const getColor = (step: number) => {
        const value = step * 28;
        return `rgb(${value}, ${255 - value}, ${255 - value})`;
    };

function SoreCircle({id, x, y, size, pain}: SoreCircle) {

    return (

    <div className="canker-sore" 
            style={{
            left: x, 
            top: y, 
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: getColor(pain),
            }}></div>

    )
}

export default SoreCircle