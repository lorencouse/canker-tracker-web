import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // Combine imports
import './MouthImage.css';
import { CankerSore } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { calculateScaledXY } from "../utilities/CankerSoreManager";
import { db } from '../firebaseConfig';
import { saveSore } from '../services/firestoreService'; 
import Slider from "../components/Slider";
import SoreCircle from "../components/SoreCircle";


const AddSoreView: React.FC = () => {

    const navigate = useNavigate();
    const [sorePosition, setSorePosition] = useState<{ xRatio: number; yRatio: number; scaledXY: number[]; } | null>(null);
    const [soreSize, setSoreSize] = useState(3);
    const [painLevel, setSorePainLevel] = useState(3);
    const { zone } = useParams<{ zone: string}>();
    const imageUrl = `../assets/images/${zone}.png`


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const xVal = event.clientX - rect.left; 
    const yVal = event.clientY - rect.top;

    const xRatio = xVal / rect.width;
    const yRatio = yVal / rect.height;

// calculated Scaled Overview coordinates
    if (!zone) return;
    const scaledXY = calculateScaledXY(xRatio, yRatio, zone) 
    

    setSorePosition({ xRatio, yRatio, scaledXY}); 
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

    
    async function buildAndSaveSore() {

        if (!sorePosition || zone === undefined) return;

        const newSore: CankerSore = {
            id: uuidv4(),
            lastUpdated: [new Date()],
            numberOfDays: 1,
            locationImage: zone,
            soreSize: [soreSize],
            painLevel: [painLevel], 
            xCoordinateZoomed: sorePosition.xRatio, 
            yCoordinateZoomed: sorePosition.yRatio,
            xCoordinateScaled: sorePosition.scaledXY[0],
            yCoordinateScaled: sorePosition.scaledXY[1],
        }

        await saveSore(newSore);

    }



    return (
        <div className="mouth-image-container" >
            <img src = {imageUrl} alt="Mouth Diagram" onClick={handleImageClick} onContextMenu={handleContextMenu}/>
            {sorePosition && (

            <SoreCircle id="" x={sorePosition.xRatio} y={sorePosition.yRatio} size={soreSize} pain={painLevel} selected={false}/>
            
            )}


        <div className="sliders">

            <Slider label="Size (mm)" min={1} max={20} value={soreSize} onChange={handleSizeChange} />

            <Slider label="Pain" min={1} max={10} value={painLevel} onChange={handlePainLevelChange} />

        </div>

        <div className="navigation-buttons">
            <button onClick={ () =>  {
            buildAndSaveSore()
            navigate("/")
            }}>
                Finish
            </button>

            <button onClick={ () => {
            buildAndSaveSore()
            navigate("/select-zone")
            } }>
                Add More
            </button>

        </div>


        </div>

    );

};

export default AddSoreView


