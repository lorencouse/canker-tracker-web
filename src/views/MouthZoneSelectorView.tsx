import React from "react";
import { useNavigate } from 'react-router-dom';
import "./MouthImage.css";



const MouthZoneSelector: React.FC = () => {

    const navigate = useNavigate();

    const handleSelectMouthZoneClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top; 
        var viewName: String

    if (y < rect.height / 2) {
        if (x < rect.width * 0.33) {
            viewName = "leftCheek";
        } else if (x < rect.width * 0.66) {
            viewName = "upperGums";
        } else {
            viewName = "rightCheek";
        }
    } else { 
        if (x < rect.width * 0.33) {
            viewName = "lips";
        } else if (x < rect.width * 0.66) {
            viewName = "tongue";
        } else {
            viewName = "lowerGums";
        }
    }

    navigate('/', { state: { viewName, addMode: true, selectedSore: null } });



    }
    
    return (
        <div className="mouth-image-container" >
            <img src="../assets/images/mouthDiagram.png" alt="Mouth Zones" onClick={handleSelectMouthZoneClick}/>
        </div>
    );


};

export default MouthZoneSelector