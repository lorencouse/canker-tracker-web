import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { CankerSore } from "../types";
import { useCankerSores } from '../context/CankerSoresContext'; 
import { handleAddSoreClick } from "../utilities/AddSoreClick";
import { handleFindNearestSoreClick } from "../utilities/NearestSoreClick";

interface ExistingSoresDiagramProps {
    viewName: string;
    addMode: boolean;
    cankerSores: CankerSore[];
    selectedSore: CankerSore | null;
}

function ExistingSoresDiagram({ viewName, addMode, cankerSores, selectedSore }: ExistingSoresDiagramProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSize, setImageSize] = useState<number>(380);
    const { setSelectedSore } = useCankerSores()


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (addMode) {
            handleAddSoreClick(event, viewName, setSelectedSore);
        } else {
            handleFindNearestSoreClick(event, viewName, cankerSores, setSelectedSore, imageRef);
        }
    };
    
    useEffect(() => {
        updateImageSize();
        window.addEventListener("resize", updateImageSize);

        return () => {
            window.removeEventListener("resize", updateImageSize)
        };
    }, []);

    const updateImageSize = () => {
        if (imageRef.current) {
            setImageSize(imageRef.current.offsetHeight)
        }
    }

    const imageURL = `../assets/images/${viewName}.png`
    
    return (
        <div className="existing-sores-diagram">
            <div className="mouth-image-container">
                <img ref={imageRef} src={imageURL} alt={viewName} onLoad={updateImageSize} onClick={handleImageClick}/>
                {selectedSore && (
                <SoreCircle id={selectedSore.id} x={viewName === "mouthDiagramNoLabels" ? (selectedSore.xCoordinateScaled ?? 0) : (selectedSore.xCoordinateZoomed ?? 0)}
                        y={viewName === "mouthDiagramNoLabels" ? (selectedSore.yCoordinateScaled ?? 0) : (selectedSore.yCoordinateZoomed ?? 0)}  size={selectedSore.soreSize[0]} pain={selectedSore.painLevel[0]} selected={true}/>
            )}
                {cankerSores.filter(sore => sore.id !== selectedSore?.id).map((sore) => (
                    <SoreCircle 
                        key={sore.id} 
                        id={sore.id} 
                        x={viewName === "mouthDiagramNoLabels" ? (sore.xCoordinateScaled ?? 0) : (sore.xCoordinateZoomed ?? 0)}
                        y={viewName === "mouthDiagramNoLabels" ? (sore.yCoordinateScaled ?? 0) : (sore.yCoordinateZoomed ?? 0)} 
                        size={sore.soreSize[sore.soreSize.length - 1] ?? 1} 
                        pain={sore.painLevel[sore.painLevel.length - 1] ?? 1} 
                        selected={sore.id === selectedSore?.id}
                    />
                ))}

            </div>

        </div>
    )
}

export default ExistingSoresDiagram;
