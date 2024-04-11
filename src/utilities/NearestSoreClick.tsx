import { CankerSore } from '../types'; 
import React, { RefObject } from 'react';

export const handleFindNearestSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  viewName: string,
  cankerSores: CankerSore[],
  setSelectedSore: (sore: CankerSore | null) => void,
  imageRef: RefObject<HTMLImageElement>
) => {
  const rect = imageRef.current?.getBoundingClientRect();
  if (!rect) return;

  const X = (event.clientX - rect.left) / rect.width;
  const Y = (event.clientY - rect.top) / rect.height;
  let nearestSore: CankerSore | null = null;
  let minDistance = Infinity;

  cankerSores.forEach(sore => {
    const soreX = (viewName === "mouthDiagramNoLabels" ? (sore.xCoordinateScaled ?? 0) : (sore.xCoordinateZoomed ?? 0));
    const soreY = (viewName === "mouthDiagramNoLabels" ? (sore.yCoordinateScaled ?? 0) : (sore.yCoordinateZoomed ?? 0));
    const dist = Math.sqrt(Math.pow(X - soreX, 2) + Math.pow(Y - soreY, 2));

    if (dist < minDistance) {
      minDistance = dist;
      nearestSore = sore;
    }
  });

  setSelectedSore(nearestSore);
};
