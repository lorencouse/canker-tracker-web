import type React from 'react';
import { useState, useEffect } from 'react';

import { useUIContext } from '@/Context/UiContext';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <div className="slider-container">
      <p>
        {label}: {value}
      </p>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const SoreSliders: React.FC = () => {
  const { selectedSore, setSelectedSore, mode } = useUIContext();

  const initialSoreSize =
    selectedSore?.soreSize[selectedSore.soreSize.length - 1] ?? 3;
  const initialPainLevel =
    selectedSore?.painLevel[selectedSore.painLevel.length - 1] ?? 3;

  const [soreSize, setSoreSize] = useState<number>(initialSoreSize);
  const [painLevel, setPainLevel] = useState<number>(initialPainLevel);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setSoreSize(newSize);
    if (selectedSore) {
      const updatedSoreSize = [...selectedSore.soreSize];
      updatedSoreSize[updatedSoreSize.length - 1] = newSize;
      setSelectedSore({ ...selectedSore, soreSize: updatedSoreSize });
    }
  };

  const handlePainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPainLevel = parseInt(event.target.value, 10);
    setPainLevel(newPainLevel);
    if (selectedSore) {
      const updatedPainLevel = [...selectedSore.painLevel];
      updatedPainLevel[updatedPainLevel.length - 1] = newPainLevel;
      setSelectedSore({ ...selectedSore, painLevel: updatedPainLevel });
    }
  };

  useEffect(() => {
    setSoreSize(initialSoreSize);
    setPainLevel(initialPainLevel);
  }, [selectedSore?.id, initialSoreSize, initialPainLevel]);

  return (
    <div>
      {selectedSore && mode !== 'view' && (
        <div className="sliders">
          <Slider
            label="Size (mm)"
            min={1}
            max={20}
            value={soreSize}
            onChange={handleSizeChange}
          />
          <Slider
            label="Pain"
            min={1}
            max={10}
            value={painLevel}
            onChange={handlePainChange}
          />
        </div>
      )}
    </div>
  );
};

export default SoreSliders;
