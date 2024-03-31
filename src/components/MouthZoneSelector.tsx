import React from "react";
import { useNavigate } from 'react-router-dom';
import "./MouthImage.css";



const MouthZoneSelector: React.FC = () => {

    const navigate = useNavigate();
    const handleSelectMouthZone = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top; 
        var zoneName: String

    if (y < rect.height / 2) {
        if (x < rect.width * 0.33) {
            zoneName = "leftCheek";
        } else if (x < rect.width * 0.66) {
            zoneName = "upperGums";
        } else {
            zoneName = "rightCheek";
        }
    } else { 
        if (x < rect.width * 0.33) {
            zoneName = "lips";
        } else if (x < rect.width * 0.66) {
            zoneName = "tongue";
        } else {
            zoneName = "lowerGums";
        }
    }

    navigate(`/mouth-zone/${zoneName}.png`)


    }
    
    return (
        <div className="mouth-image-container" >
            <img src="../assets/images/mouthDiagram.png" alt="Mouth Zones" onClick={handleSelectMouthZone}/>
        </div>
    );


};

export default MouthZoneSelector