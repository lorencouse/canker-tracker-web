import { CankerSore } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const handleAddSoreClick = (
  event: React.MouseEvent<HTMLImageElement, MouseEvent>, 
  setSelectedSore: (sore: CankerSore | null) => void
) => {
  const naturalHeight: number = 1024;
  const naturalWidth: number = 1024;
  const rect = event.currentTarget.getBoundingClientRect();
  const xVal = event.clientX - rect.left;
  const yVal = event.clientY - rect.top;

  // Calculate coordinates relative to the natural size of the image
  const xScaled = (xVal / rect.width);
  const yScaled = (yVal / rect.height);
  console.log(`X: ${xScaled} y:${yScaled}`)

  const newSelectedSore: CankerSore = {
      id: uuidv4(),
      lastUpdated: [new Date()],
      numberOfDays: 1,
      locationImage: event.currentTarget.src,
      soreSize: [3], 
      painLevel: [3], 
      xCoordinate: xScaled,
      yCoordinate: yScaled,
  };
  
  setSelectedSore(newSelectedSore);
};
