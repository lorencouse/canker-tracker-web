import React, { useState } from "react";
import './MouthImage.css';
import mouthDiagram from '../assets/images/mouthDiagramNoLabels.png';


const MouthImage: React.FC = () => {
    const [sorePosition, setSorePosition] = useState<{ x: number; y: number } | null>(null);
    const [soreSize, setSoreSize] = useState(3);
    const [sorePainLevel, setSorePainLevel] = useState(3);


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; 
    const y = event.clientY - rect.top; 
    setSorePosition({ x, y }); 
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoreSize(parseInt(event.target.value, 10));
    }

    const handlePainLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSorePainLevel(parseInt(event.target.value, 10));
    }

    const getColor = (step: number) => {
        const value = step * 28;
        return `rgb(${value}, ${255 - value}, ${255 - value})`;
    };

    return (
        <div className="mouth-image-container" onContextMenu={handleContextMenu}>
            <img src={mouthDiagram} alt="Mouth Diagram" onClick={handleImageClick}/>
            {sorePosition && (
            
            <div className="canker-sore" 
            style={{
            left: sorePosition.x, 
            top: sorePosition.y, 
            width: `${soreSize}px`,
            height: `${soreSize}px`,
            backgroundColor: getColor(sorePainLevel),
            }}></div>
            )}


        <div className="sliders">
            <div className="slider-container">
            <label>
                Sore Size: {soreSize} mm 
                <input type="range" className="slider" min="1" max="20" value={soreSize} onChange={handleSizeChange} />

            </label>
            </div>
            
            <div className="slider-container">
            <label>
                Pain Level: {sorePainLevel}
                <input type="range" className="slider" min="1" max="10" value={sorePainLevel} onChange={handlePainLevelChange} />
            </label>
            </div>

        </div>

        <div className="navigation-buttons">
            <button>
                Finish
            </button>

            <button>
                Add More
            </button>

        </div>


        </div>

    );

};

export default MouthImage


