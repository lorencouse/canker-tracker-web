import React from "react";

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

export default Slider