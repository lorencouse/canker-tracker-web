import { CankerSore } from '../types'; 
import { calculateScaledXY } from './CankerSoreManager';
import { v4 as uuidv4 } from 'uuid';

export const handleAddSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>, 
  viewName: string, 
  setSelectedSore: (sore: CankerSore | null) => void
) => {
  const rect = event.currentTarget.getBoundingClientRect();

  const xVal = event.clientX - rect.left;
  const yVal = event.clientY - rect.top;

  const xRatio = xVal / rect.width;
  const yRatio = yVal / rect.height;

  const scaledXY = calculateScaledXY(xRatio, yRatio, viewName);

  const newSelectedSore: CankerSore = {
      id: uuidv4(),
      lastUpdated: [new Date()],
      numberOfDays: 1,
      locationImage: viewName,
      soreSize: [3], // Default size
      painLevel: [3], // Default pain level
      xCoordinateZoomed: xRatio,
      yCoordinateZoomed: yRatio,
      xCoordinateScaled: scaledXY[0],
      yCoordinateScaled: scaledXY[1],
  };
  
  setSelectedSore(newSelectedSore);
};
