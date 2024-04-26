import React from "react";
// import Slider from "./Slider";

interface SoreSliderProps {
    soreSize: number;
    setSoreSize: (value: number) => void;
    painLevel: number;
    setPainLevel: (value: number) => void;
}

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

const SoreSliders = ({soreSize, setSoreSize, painLevel, setPainLevel}: SoreSliderProps) => {
        const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoreSize(parseInt(event.target.value, 10));
    }

    const handlePainLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPainLevel(parseInt(event.target.value, 10));
    }

    return (
                <div className="sliders">

            <Slider label="Size (mm)" min={1} max={20} value={soreSize} onChange={handleSizeChange} />

            <Slider label="Pain" min={1} max={10} value={painLevel} onChange={handlePainLevelChange} />

        </div>
    );


};

export default SoreSliders