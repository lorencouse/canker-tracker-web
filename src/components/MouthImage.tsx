import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // Combine imports
import './MouthImage.css';
import { CankerSore } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { calculateScaledXY } from "../utilities/CankerSoreManager";
import { db } from '../firebaseConfig';
import { addCankerSoreToFirestore } from '../services/firestoreService'; 


const MouthImage: React.FC = () => {

    const navigate = useNavigate();
    const [sorePosition, setSorePosition] = useState<{ x: number; y: number } | null>(null);
    const [soreSize, setSoreSize] = useState(3);
    const [sorePainLevel, setSorePainLevel] = useState(3);
    const { zone } = useParams<{ zone: string}>();
    const imageUrl = `../assets/images/${zone}`


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

    
    async function saveCankerSore() {

        if (!sorePosition || zone === undefined) return;

        const scaledXY = calculateScaledXY(sorePosition?.x, sorePosition?.y, zone) 

        const newSore: CankerSore = {
            id: uuidv4(),
            lastUpdated: [new Date()],
            numberOfDays: 5,
            locationImage: zone,
            soreSize: [soreSize],
            painLevel: [sorePainLevel], 
            xCoordinateZoomed: sorePosition.x, 
            yCoordinateZoomed: sorePosition.y,
            xCoordinateScaled: scaledXY[0],
            yCoordinateScaled: scaledXY[1],
        }

        await addCankerSoreToFirestore(newSore);

    }



    return (
        <div className="mouth-image-container" >
            <img src = {imageUrl} alt="Mouth Diagram" onClick={handleImageClick} onContextMenu={handleContextMenu}/>
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
            <button onClick={ () =>  {
            saveCankerSore()
            navigate("/")
            }}>
                Finish
            </button>

            <button onClick={ () => {
            saveCankerSore()
            navigate("/select-zone")
            } }>
                Add More
            </button>

        </div>


        </div>

    );

};

export default MouthImage


