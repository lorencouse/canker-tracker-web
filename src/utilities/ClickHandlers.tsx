// import { useCankerSores } from "../context/CankerSoresContext";
import { v4 as uuidv4 } from 'uuid';
import React, { RefObject } from 'react';
import { CankerSore } from "../types";

export const handleFindNearestSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>,
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
    const soreX = (sore.xCoordinate ?? 0);
    const soreY = (sore.yCoordinate ?? 0);
    const dist = Math.sqrt(Math.pow(X - soreX, 2) + Math.pow(Y - soreY, 2));

    if (dist < minDistance) {
      minDistance = dist;
      nearestSore = sore;
    }
  });

  setSelectedSore(nearestSore);
};

export const handleAddSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>, 
  viewName: string,
  gums: boolean,
  setSelectedSore: (sore: CankerSore | null) => void
) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const xVal = event.clientX - rect.left;
  const yVal = event.clientY - rect.top;

  const xScaled = (xVal / rect.width);
  const yScaled = (yVal / rect.height);
  console.log(`X: ${xScaled} y:${yScaled}`)

  const newSelectedSore: CankerSore = {
      id: uuidv4(),
      lastUpdated: [new Date()],
      numberOfDays: 1,
      zone: viewName,
      gums: gums,
      soreSize: [3], 
      painLevel: [3], 
      xCoordinate: xScaled,
      yCoordinate: yScaled,
  };
  
  setSelectedSore(newSelectedSore);
};

