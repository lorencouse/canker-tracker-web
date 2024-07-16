import React from 'react';

import type { CankerSore } from '../../types';

interface SoreCircleProps {
  sore: CankerSore;
  selected: boolean;
  imageDimensions: { width: number; height: number };
  zoomed: number;
  offsetX: number;
  offsetY: number;
  setSelectedSore: (sore: CankerSore | null) => void;
}

const getColor = (step: number) => {
  const value = step * 28;
  return `rgb(${value}, ${255 - value}, ${255 - value}`;
};

const SoreCircle: React.FC<SoreCircleProps> = React.memo(
  ({
    sore,
    imageDimensions,
    selected,
    zoomed,
    offsetX,
    offsetY,
    setSelectedSore,
  }) => {
    const zoomLevel = zoomed * 100;
    const { xCoordinate, yCoordinate, painLevel, soreSize } = sore;
    const size =
      Math.max(imageDimensions.width, imageDimensions.height) *
      (soreSize[soreSize.length - 1] / (200 / zoomed));
    const xPercent = (xCoordinate ?? 0) * zoomLevel;
    const yPercent = (yCoordinate ?? 0) * zoomLevel;

    return (
      <div
        className="canker-sore"
        onClick={() => {
          setSelectedSore(sore);
        }}
        style={{
          left: `${zoomed !== 1 ? xPercent + (offsetX - 100 / zoomed) : xPercent}%`,
          top: `${zoomed !== 1 ? yPercent + (offsetY - 100 / zoomed) : yPercent}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${getColor(painLevel[painLevel.length - 1])}, ${selected ? '1' : '0.5)'}`,
          border: selected ? '2px solid blue' : '1px solid white',
          // opacity: selected ? "100%" : "20%"
        }}
        key={sore.id}
      />
    );
  }
);

export default SoreCircle;
