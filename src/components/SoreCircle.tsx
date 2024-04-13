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
    let soreSize: number = size *.2;

    return (
        <div className="canker-sore" 
            style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`, 
                width: `${soreSize}%`,
                height: `${soreSize}%`,
                backgroundColor: getColor(pain),
                border: selected ? "2px solid blue" : "1px solid white",
            }}
        ></div>
    );
});

export default SoreCircle;
