import React, { useState } from "react";
import './MouthImage.css';
import mouthDiagram from '../assets/images/mouth-diagram.png';


const MouthImage: React.FC = () => {
    const [dotPosition, setDotPosition] = useState<{ x: number; y: number } | null>(null);

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setDotPosition({ x, y })
        
    }

        const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <div className="mouth-image" onClick={handleImageClick} onContextMenu={handleContextMenu}>
            <img src={mouthDiagram} alt="clickable" />
            {dotPosition && (<div className="canker-sore" style={{left: dotPosition.x, top: dotPosition.y}}></div>)}

        </div>

    );

};

export default MouthImage


