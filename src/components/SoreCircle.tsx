import React from "react";
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";

interface SoreCircleProps {
    sore: CankerSore;
    imageDimensions: {width: number, height: number};
    selected: boolean;
    zoomed: boolean,
    offsetX: number,
    offsetY: number
}



const getColor = (step: number) => {
    const value = step * 28;
    return `rgb(${value}, ${255 - value}, ${255 - value})`;
};

const SoreCircle: React.FC<SoreCircleProps> = React.memo(({ sore, imageDimensions, selected, zoomed, offsetX, offsetY }) => {
    
    const { setSelectedSore } = useCankerSores()
    const zoomLevel = zoomed ? 200 : 100;
    const {xCoordinate, yCoordinate, painLevel, soreSize} = sore;
    
    // const x = (xCoordinate ?? 0) * imageDimensions.width * zoomLevel;
    // const y = (yCoordinate ?? 0 ) * imageDimensions.height * zoomLevel; 
    const size = Math.max(imageDimensions.width, imageDimensions.height) * (soreSize[soreSize.length - 1] / 100);
    const xPercent = ((xCoordinate ?? 0) * (zoomLevel))
    const yPercent = ((yCoordinate ?? 0) * (zoomLevel))
    console.log("X:" + xPercent + "Y:" + yPercent)


    return (
        <div className="canker-sore" onClick={() => {setSelectedSore(sore)}}
            style={{
                left: `${zoomed ? (xPercent + (offsetX - 50)) : xPercent}%`,
                top: `${zoomed ? (yPercent + (offsetY - 50)) : yPercent}%`, 
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: getColor(painLevel[painLevel.length-1]),
                border: selected ? "2px solid blue" : "1px solid white",
            }}
        ></div>
    );
});

export default SoreCircle;