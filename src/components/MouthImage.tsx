import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // Combine imports
import './MouthImage.css';
import { CankerSore } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { calculateScaledXY } from "../utilities/CankerSoreManager";
import { db } from '../firebaseConfig';
import { saveSore } from '../services/firestoreService'; 
import Slider from "./Slider";
import SoreCircle from "./SoreCircle";


const MouthImage: React.FC = () => {

    const navigate = useNavigate();
    const [sorePosition, setSorePosition] = useState<{ x: number; y: number, imageSize: number } | null>(null);
    const [soreSize, setSoreSize] = useState(3);
    const [painLevel, setSorePainLevel] = useState(3);
    const { zone } = useParams<{ zone: string}>();
    const imageUrl = `../assets/images/${zone}`


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const imageSize = rect.width
    const x = event.clientX - rect.left 
    const y = event.clientY - rect.top 
    setSorePosition({ x, y, imageSize}); 
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
        //  Convert corrinates to XY offset ratio for mapping on responsive images.
        const xRatio = sorePosition.x / sorePosition.imageSize; 
        const yRatio = sorePosition.y / sorePosition.imageSize;

        // Convert points to original image scale dimensions of 380x380
        const xPosition = 380 * xRatio
        const yPosition = 380 * yRatio 
        const scaledXY = calculateScaledXY(xPosition, yPosition, zone) 

        const newSore: CankerSore = {
            id: uuidv4(),
            lastUpdated: [new Date()],
            numberOfDays: 1,
            locationImage: zone,
            soreSize: [soreSize],
            painLevel: [painLevel], 
            xCoordinateZoomed: xRatio, 
            yCoordinateZoomed: yRatio,
            xCoordinateScaled: scaledXY[0],
            yCoordinateScaled: scaledXY[1],
        }

        await saveSore(newSore);

    }



    return (
        <div className="mouth-image-container" >
            <img src = {imageUrl} alt="Mouth Diagram" onClick={handleImageClick} onContextMenu={handleContextMenu}/>
            {sorePosition && (

            <SoreCircle id="" x={sorePosition.x} y={sorePosition.y} size={soreSize} pain={painLevel} />
            
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

export default MouthImage


