import type React from 'react';
import { Circle, Label, Text } from 'react-konva';

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
        width={latestSize * 3}
        height={latestSize * 3}
        fill={getColor(latestPain)}
        shadowBlur={5}
      />
    </Label>
  );
};

export default SoreCircle;
