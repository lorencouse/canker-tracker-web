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
    const [ selectedZone, setSelectedZone ] = useState<string>("mouthDiagramNoLabels")
    const [imageDimensions, setImageDimensions] = useState({ width: 512, height: 512 });



    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if ((editMode || addMode) && !zoomed) {
            handleSelectMouthZoneClick(event);
            setZoomed(true)

        } else if (editMode && zoomed) {
        handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);

        } else if (addMode && zoomed) {
            handleAddSoreClick(event, setSelectedSore)
        }else {
            handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
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

        setSelectedZone(viewName)
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
            case "mouthDiagramNoLabels":
                localOffsetX = 0;
                localOffsetY = 0;
                break;
            default:
                return;

        }

        setOffsetX(localOffsetX);
        setOffsetY(localOffsetY);
        setZoomed( viewName === "mouthDiagramNoLabels" ? false : true); 
    };

    useEffect(() => {
        if (editMode && selectedSore) {
            zoomEditView(selectedSore.locationImage);
        } if (!addMode && !editMode) {
            zoomEditView("mouthDiagramNoLabels") 
        }
    }, [editMode, addMode, selectedSore]);
    
    useEffect(() => {
        updateImageSize(); 
        window.addEventListener("resize", updateImageSize);

        return () => {
            window.removeEventListener("resize", updateImageSize);
        };
    }, [imageRef.current]);

    const updateImageSize = () => {
        if (imageRef.current) {
            setImageDimensions({
                width: imageRef.current.offsetWidth,
                height: imageRef.current.offsetHeight
            });
        }
    };

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
                <SoreCircle id={selectedSore.id} x={selectedSore.xCoordinate ?? 0}
                        y={selectedSore.yCoordinate ?? 0}  size={selectedSore.soreSize[0]} pain={selectedSore.painLevel[0]} selected={true}/>
            )}
                {cankerSores.filter(sore => sore.id !== selectedSore?.id).map((sore) => (
                    <SoreCircle 
                        key={sore.id} 
                        id={sore.id} 
                        x={ ((sore.xCoordinate ?? 1)) }
                        y={ ((sore.yCoordinate ?? 1)) } 
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
