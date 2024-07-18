import type React from 'react';
import { Circle, Label } from 'react-konva';

import { useUIContext } from '@/Context/UiContext';
import type { CankerSore } from '@/types';

interface SoreCircleProps {
  sore: CankerSore;
  handleDragLabelCoordination: (e: any) => void;
  handleClickLabel: (e: any) => void;
}

const SoreCircle: React.FC<SoreCircleProps> = ({
  sore,
  handleDragLabelCoordination,
  handleClickLabel,
}) => {
  const getColor = (painLevel: number) => {
    const shade = 255 - painLevel * 20;
    return `rgb(255, ${shade}, ${shade})`;
  };

  const latestSize = sore.size[sore.size.length - 1];
  const latestPain = sore.pain[sore.pain.length - 1];

  const { selectedSore } = useUIContext();

  return (
    <Label
      id={`${sore.id}`}
      x={sore.x}
      y={sore.y}
      draggable
      onDragEnd={handleDragLabelCoordination}
      onClick={handleClickLabel}
    >
      <Circle
        width={latestSize * 2}
        height={latestSize * 2}
        fill={getColor(latestPain)}
        shadowBlur={sore.id === selectedSore?.id ? 10 : 0}
        shadowColor="white"
        stroke={sore.id === selectedSore?.id ? 'white' : 'transparent'}
      />
    </Label>
  );
};

export default SoreCircle;
