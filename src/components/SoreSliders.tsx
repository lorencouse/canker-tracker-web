import React, { useState } from "react";
import { useSoreManager } from "../Hooks/useSoreManager";
import { CankerSore } from "../types";
interface SliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Slider({label, min, max, value, onChange}: SliderProps) {


return (

                <div className="slider-container">
            <label>
                {label}: {value} 
                <input type="range" className="slider" min={min} max={max} value={value} onChange={onChange} />

            </label>
            </div>

)

}

interface SoreSlidersProps {
    selectedSore: CankerSore;
    setSelectedSore: (sore: CankerSore) => void;
}

const SoreSliders = ( {selectedSore, setSelectedSore}: SoreSlidersProps) => {

    // const { selectedSore, setSelectedSore } = useSoreManager();
    

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        if (selectedSore && selectedSore.soreSize) {
            const newSizes = [...selectedSore.soreSize];
            newSizes[newSizes.length - 1] = newSize; // Update the last item or a specific item
            const newSore = { ...selectedSore, soreSize: newSizes };
            setSelectedSore(newSore);
        }
    }

    const handlePainLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPainLevel = parseInt(event.target.value, 10);
        if (selectedSore && selectedSore.painLevel) {
            const newPainLevels = [...selectedSore.painLevel];
            newPainLevels[newPainLevels.length - 1] = newPainLevel; // Update the last item or a specific item
            const newSore = { ...selectedSore, painLevel: newPainLevels };
            setSelectedSore(newSore);
        }
    }

    return (
                <div className="sliders">

            <Slider label="Size (mm)" min={1} max={20} value={selectedSore?.soreSize ? selectedSore.soreSize[selectedSore.soreSize.length - 1] : 3} onChange={handleSizeChange} />

            <Slider label="Pain" min={1} max={10} value={selectedSore?.painLevel ? selectedSore.painLevel[selectedSore.painLevel.length - 1] : 5} onChange={handlePainLevelChange} />

        </div>
    );


};

export default SoreSliders