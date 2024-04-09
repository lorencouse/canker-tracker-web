import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; 
import './MouthImage.css';
import { CankerSore } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { calculateScaledXY } from "../utilities/CankerSoreManager";
import { db } from '../firebaseConfig';
import { saveSore } from '../services/firestoreService'; 
import SoreCircle from "../components/SoreCircle";
import SoreSliders from "../components/SoreSliders";
import { useCankerSores } from "../context/CankerSoresContext";

const AddSoreView: React.FC = () => {

    const navigate = useNavigate();
    // const [sorePosition, setSorePosition] = useState<{ xRatio: number; yRatio: number; scaledXY: number[]; } | null>(null);
    // const [soreSize, setSoreSize] = useState(3);
    // const [painLevel, setPainLevel] = useState(3);
    const [selectedSore, setSelectedSore] = useState<CankerSore | null>(null);
    const { setSelectedSore: setSelectedSoreContext } = useCankerSores();
    const { zone } = useParams<{ zone: string}>();
    const imageUrl = `../assets/images/${zone}.png`


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        const xVal = event.clientX - rect.left; 
        const yVal = event.clientY - rect.top;

        const xRatio = xVal / rect.width;
        const yRatio = yVal / rect.height;

        if (!zone) return;
        const scaledXY = calculateScaledXY(xRatio, yRatio, zone);
        
        const newSelectedSore: CankerSore = {
            id: uuidv4(),
            lastUpdated: [new Date()],
            numberOfDays: 1,
            locationImage: zone,
            soreSize: [3], // Default size
            painLevel: [3], // Default pain level
            xCoordinateZoomed: xRatio, 
            yCoordinateZoomed: yRatio,
            xCoordinateScaled: scaledXY[0],
            yCoordinateScaled: scaledXY[1],
        };


        setSelectedSore(newSelectedSore);
        setSelectedSoreContext(newSelectedSore);

    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };
    
    async function buildAndSaveSore() {

        if (!selectedSore || zone === undefined) return;

        // const newSore: CankerSore = {
        //     id: uuidv4(),
        //     lastUpdated: [new Date()],
        //     numberOfDays: 1,
        //     locationImage: zone,
        //     soreSize: [soreSize],
        //     painLevel: [painLevel], 
        //     xCoordinateZoomed: sorePosition.xRatio, 
        //     yCoordinateZoomed: sorePosition.yRatio,
        //     xCoordinateScaled: sorePosition.scaledXY[0],
        //     yCoordinateScaled: sorePosition.scaledXY[1],
        // }

        await saveSore(selectedSore);

    }



    return (
        <div className="add-sores-container">

        <div className="mouth-image-container" >
            
            <img src = {imageUrl} alt="Mouth Diagram" onClick={handleImageClick} onContextMenu={handleContextMenu}/>
             {selectedSore && (
                <SoreCircle id="" x={selectedSore.xCoordinateZoomed ?? 0} y={selectedSore.yCoordinateZoomed ?? 0} size={selectedSore.soreSize[0]} pain={selectedSore.painLevel[0]} selected={false}/>
            )}
        </div>



           {selectedSore && ( <SoreSliders 
    soreSize={selectedSore.soreSize[0]}
    setSoreSize={(size: number) => setSelectedSore(prevState => prevState ? ({...prevState, soreSize: [size]}) : null)}
    painLevel={selectedSore.painLevel[0]}
    setPainLevel={(level: number) => setSelectedSore(prevState => prevState ? ({...prevState, painLevel: [level]}) : null)} />

            )}


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


