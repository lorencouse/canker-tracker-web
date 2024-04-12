import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { CankerSore } from "../types";
import { useCankerSores } from '../context/CankerSoresContext'; 
import { handleAddSoreClick } from "../utilities/AddSoreClick";
import { handleFindNearestSoreClick } from "../utilities/NearestSoreClick";

interface ExistingSoresDiagramProps {
    viewName: string;
    addMode: boolean;
    editMode: boolean;
    cankerSores: CankerSore[];
    selectedSore: CankerSore | null;
}

function ExistingSoresDiagram({ viewName, addMode, editMode, cankerSores, selectedSore }: ExistingSoresDiagramProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const { setSelectedSore } = useCankerSores();
    const [imageSize, setImageSize] = useState<number>(380);



    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (editMode || addMode && !zoomed) {
            handleSelectMouthZoneClick(event);
            setZoomed(true)


        } else if (editMode && zoomed) {
        handleFindNearestSoreClick(event, viewName, cankerSores, setSelectedSore, imageRef);

        } else if (addMode && zoomed) {
            handleAddSoreClick(event, viewName, setSelectedSore)
        }else {
            handleFindNearestSoreClick(event, viewName, cankerSores, setSelectedSore, imageRef);
        }
    };

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
        setZoomed(true); 
    };

    function zoomEditView(viewName: string) {

        var localOffsetX = 0;
        var localOffsetY = 0;

        switch(viewName) {
            case "leftCheek":
                localOffsetX = 50; 
                localOffsetY = 50;
                break;
            case "upperGums":
                localOffsetX = 0;
                localOffsetY = 50;
                break;
            case "rightCheek":
                localOffsetX = -50;
                localOffsetY = 50;
                break;
            case "lips":
                localOffsetX = 50;
                localOffsetY = -50;
                break;
            case "tongue":
                localOffsetX = 0;
                localOffsetY = -33;
                break;
            case "lowerGums":
                localOffsetX = -50;
                localOffsetY = -50;
                break;
            default:
                return;

        }

        setOffsetX(localOffsetX);
        setOffsetY(localOffsetY);
        setZoomed(true); 
    };

        useEffect(() => {
        if (editMode && selectedSore) {
            zoomEditView(selectedSore.locationImage);
        }
    }, [editMode, selectedSore]);
    
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
                <img ref={imageRef} src={imageURL} alt={viewName} onLoad={updateImageSize} onClick={handleImageClick} 
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-out',
                    transform: zoomed ? 'scale(2)' : 'scale(1)', 
                    transformOrigin: `${50 - offsetX}% ${50 - offsetY}%` 
                }}/>
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
