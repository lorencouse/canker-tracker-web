import React from "react";

interface SoreCircleProps {
    id: string;
    x: number;
    y: number;
    size: number;
    pain: number;
    selected: boolean;
}

const getColor = (step: number) => {
    const value = step * 28;
    return `rgb(${value}, ${255 - value}, ${255 - value})`;
};

const SoreCircle: React.FC<SoreCircleProps> = React.memo(({ id, x, y, size, pain, selected }) => {
    let soreSize: number;
    if (selected) {
        soreSize = size * .3;
    } else {
        soreSize = size *.2;
    }
    return (
        <div className="canker-sore" 
            style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`, 
                width: `${soreSize}%`,
                height: `${soreSize}%`,
                backgroundColor: getColor(pain),
                border: selected ? "3px solid black" : "2px solid white",
            }}
        ></div>
    );
});

export default SoreCircle;
