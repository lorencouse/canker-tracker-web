// import { useCankerSores } from "../context/CankerSoresContext";
import type { RefObject } from 'react';
import type React from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { CankerSore } from '../types';

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

  cankerSores.forEach((sore) => {
    const soreX = sore.xCoordinate ?? 0;
    const soreY = sore.yCoordinate ?? 0;
    const dist = Math.sqrt((X - soreX) ** 2 + (Y - soreY) ** 2);

    if (dist < minDistance) {
      minDistance = dist;
      nearestSore = sore;
    }
  });

  setSelectedSore(nearestSore);
};

const calcView = (x: number, y: number, height: number, width: number) => {
  if (y < height / 2) {
    if (x < width * 0.33) {
      return 'Left Cheek';
    }
    if (x < width * 0.66) {
      return 'Upper Mouth';
    }
    return 'Right Cheek';
  }
  if (x < width * 0.33) {
    return 'Left Jaw';
  }
  if (x < width * 0.66) {
    return 'Lower Mouth';
  }
  return 'Right Jaw';
};

export const handleAddSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  gums: boolean,
  setSelectedSore: (sore: CankerSore | null) => void,
  setZoomed: (zoomed: number) => void,
  zoomed: number,
  zoomToSore: (x: number, y: number) => void
) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xPercent = x / rect.width;
  const yPercent = y / rect.height;

  const viewName = calcView(x, y, rect.height, rect.width);
  // setSelectedZone(viewName);

  const newSelectedSore: CankerSore = {
    id: uuidv4(),
    active: true,
    lastUpdated: [new Date()],
    numberOfDays: 1,
    zone: viewName,
    gums,
    soreSize: [3],
    painLevel: [3],
    xCoordinate: xPercent,
    yCoordinate: yPercent,
  };

  if (zoomed === 1) {
    setZoomed(2);
    zoomToSore(xPercent, yPercent);
  } else {
    setTimeout(() => {
      zoomToSore(xPercent, yPercent);
    }, 150);
  }

  setSelectedSore(newSelectedSore);
};
