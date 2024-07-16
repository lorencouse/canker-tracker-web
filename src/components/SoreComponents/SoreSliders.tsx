import type React from 'react';
import { useState, useEffect } from 'react';

import { Slider } from '@/components/ui/slider';
import { useUIContext } from '@/Context/UiContext';

const SoreSliders: React.FC = () => {
  const { selectedSore, setSelectedSore, sores, setSores } = useUIContext();

  const initialSoreSize = selectedSore?.size ?? [3];
  const initialPainLevel = selectedSore?.pain ?? [3];

  const [soreSize, setSoreSize] = useState<number[]>(initialSoreSize);
  const [painLevel, setPainLevel] = useState<number[]>(initialPainLevel);

  const handleSizeChange = (newValue: number[]) => {
    const updatedSoreSize = [...soreSize];
    updatedSoreSize[updatedSoreSize.length - 1] = newValue[0];
    setSoreSize(updatedSoreSize);
    if (selectedSore) {
      const updatedSelectedSore = { ...selectedSore, size: updatedSoreSize };
      setSelectedSore(updatedSelectedSore);

      // Update the sores array
      const updatedSores = sores.map((sore) =>
        sore.id === selectedSore.id ? updatedSelectedSore : sore
      );
      setSores(updatedSores);
    }
  };

  const handlePainChange = (newValue: number[]) => {
    const updatedPainLevel = [...painLevel];
    updatedPainLevel[updatedPainLevel.length - 1] = newValue[0];
    setPainLevel(updatedPainLevel);
    if (selectedSore) {
      const updatedSelectedSore = { ...selectedSore, pain: updatedPainLevel };
      setSelectedSore(updatedSelectedSore);

      // Update the sores array
      const updatedSores = sores.map((sore) =>
        sore.id === selectedSore.id ? updatedSelectedSore : sore
      );
      setSores(updatedSores);
    }
  };

  useEffect(() => {
    setSoreSize(initialSoreSize);
    setPainLevel(initialPainLevel);
  }, [selectedSore?.id, initialSoreSize, initialPainLevel]);

  return (
    <div>
      {selectedSore && (
        <div className="sliders">
          <p>
            id: {selectedSore.id} size: {selectedSore.size}
          </p>
          <div className="slider-container">
            <p>Size: {soreSize[soreSize.length - 1]}</p>
            <Slider
              min={1}
              max={20}
              value={[soreSize[soreSize.length - 1]]}
              onValueChange={handleSizeChange}
            />
          </div>
          <div className="slider-container">
            <p>Pain: {painLevel[painLevel.length - 1]}</p>
            <Slider
              min={1}
              max={10}
              value={[painLevel[painLevel.length - 1]]}
              onValueChange={handlePainChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SoreSliders;
