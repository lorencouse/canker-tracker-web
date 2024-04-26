import React from "react";
import { CankerSore } from "../../types";
import { useCankerSores } from "../../context/CankerSoresContext";

interface SoreCircleProps {
    sore: CankerSore;
    imageDimensions: {width: number, height: number};
    selected: boolean;
    zoomed: number,
    offsetX: number,
    offsetY: number
}

const getColor = (step: number) => {
    const value = step * 28;
    return `rgb(${value}, ${255 - value}, ${255 - value}`;
};

const SoreCircle: React.FC<SoreCircleProps> = React.memo(({ sore, imageDimensions, selected, zoomed, offsetX, offsetY }) => {
    
    const { setSelectedSore } = useCankerSores()
    const zoomLevel = zoomed * 100;
    const {xCoordinate, yCoordinate, painLevel, soreSize} = sore;
    
    const size = Math.max(imageDimensions.width, imageDimensions.height) * (soreSize[soreSize.length - 1] / (zoomed ? 100 : 200));
    const xPercent = ((xCoordinate ?? 0) * (zoomLevel))
    const yPercent = ((yCoordinate ?? 0) * (zoomLevel))

    return (
        <div className="canker-sore" onClick={() => {setSelectedSore(sore)}}
            style={{
                left: `${zoomed !== 1 ? (xPercent + (offsetX - 50)) : xPercent}%`,
                top: `${zoomed !== 1 ? (yPercent + (offsetY - 50)) : yPercent}%`, 
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `${getColor(painLevel[painLevel.length-1])}, ${selected ? "1" : "0.5)"}`,
                border: selected ? "2px solid blue" : "1px solid white",
                // opacity: selected ? "100%" : "20%"
            }}
        ></div>
    );
});

export default SoreCircle;