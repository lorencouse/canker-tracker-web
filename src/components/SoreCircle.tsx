import React from "react";
import { CankerSore } from "../types";

interface SoreCircleProps {
    sore: CankerSore;
    imageDimensions: {width: number, height: number};
    selected: boolean;
}



const getColor = (step: number) => {
    const value = step * 28;
    return `rgb(${value}, ${255 - value}, ${255 - value})`;
};

const SoreCircle: React.FC<SoreCircleProps> = React.memo(({ sore, imageDimensions, selected }) => {

    const {xCoordinate, yCoordinate, painLevel, soreSize} = sore;
    const x = (xCoordinate ?? 0) * imageDimensions.width;
    const y = (yCoordinate ?? 0 ) * imageDimensions.height; 
    const size = Math.max(imageDimensions.width, imageDimensions.height) * (soreSize[soreSize.length - 1] / 100);


    return (
        <div className="canker-sore" 
            style={{
                left: `${x}px`,
                top: `${y}px`, 
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: getColor(painLevel[painLevel.length-1]),
                border: selected ? "2px solid blue" : "1px solid white",
            }}
        ></div>
    );
});

export default SoreCircle;
