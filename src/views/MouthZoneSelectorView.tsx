import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./MouthImage.css";

const MouthZoneSelector: React.FC = () => {
    const [zoom, setZoom] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const handleSelectMouthZoneClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;
        var viewName = "";
        var localOffsetX = 0;
        var localOffsetY = 0;

        if (y < rect.height / 2) {
            if (x < rect.width * 0.33) {
                viewName = "leftCheek";
                localOffsetX = 50; 
                localOffsetY = 50;
            } else if (x < rect.width * 0.66) {
                viewName = "upperGums";
                localOffsetX = 0;
                localOffsetY = 50;
            } else {
                viewName = "rightCheek";
                localOffsetX = -50;
                localOffsetY = 50;
            }
        } else {
            if (x < rect.width * 0.33) {
                viewName = "lips";
                localOffsetX = 50;
                localOffsetY = -50;
            } else if (x < rect.width * 0.66) {
                viewName = "tongue";
                localOffsetX = 0;
                localOffsetY = -33;
            } else {
                viewName = "lowerGums";
                localOffsetX = -50;
                localOffsetY = -50;
            }
        }

        setOffsetX(localOffsetX);
        setOffsetY(localOffsetY);
        setZoom(true); 
    };

    return (
        <div className="mouth-image-container">
            <img 
                src="../assets/images/mouthDiagram.png" 
                alt="Mouth Zones" 
                onClick={handleSelectMouthZoneClick}
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-out',
                    transform: zoom ? 'scale(2)' : 'scale(1)', 
                    transformOrigin: `${50 - offsetX}% ${50 - offsetY}%` 
                }}
            />
        </div>
    );
};

export default MouthZoneSelector;
