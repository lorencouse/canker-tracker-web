import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { CankerSore } from "../types";
import { useCankerSores } from '../context/CankerSoresContext'; 
import { handleAddSoreClick } from "../utilities/AddSoreClick";
import { handleFindNearestSoreClick } from "../utilities/NearestSoreClick";

interface ExistingSoresDiagramProps {
    addMode: boolean;
    editMode: boolean;
    cankerSores: CankerSore[];
    selectedSore: CankerSore | null;
}

function ExistingSoresDiagram({ addMode, editMode, cankerSores }: ExistingSoresDiagramProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const { setSelectedSore } = useCankerSores();
    const [ selectedZone, setSelectedZone ] = useState<string>("mouthDiagramNoLabels")
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (addMode && !zoomed) {
            handleSelectMouthZoneClick(event);
            setZoomed(true);
        } else if (editMode && zoomed) {
        handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
        console.log(cankerSores)
        } else if (addMode && zoomed) {
            handleAddSoreClick(event, selectedZone, setSelectedSore)
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
            setZoomed(true)
            zoomEditView(selectedSore.locationImage);
        } if (!addMode && !editMode) {
            setZoomed(false)
            zoomEditView("mouthDiagramNoLabels") 
        }
    }, [editMode, addMode, selectedSore]);
    
    useEffect(() => {
        updateImageSize(); 
        window.addEventListener("resize", updateImageSize);

        return () => {
            window.removeEventListener("resize", updateImageSize);
        };
    }, []);

    const updateImageSize = () => {
        if (imageRef.current) {
            setImageDimensions({
                width: imageRef.current.offsetWidth,
                height: imageRef.current.offsetHeight
            });
        }
    };

    const imageURL = `../assets/images/mouthDiagramNoLabels.png`
    
    return (
        <div className="existing-sores-diagram">
            <div className="mouth-image-container">
                <img ref={imageRef} src={imageURL} alt="Mouth Diagram" onLoad={updateImageSize} onClick={handleImageClick} 
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-out',
                    transform: zoomed ? 'scale(2)' : 'scale(1)', 
                    transformOrigin: `${50 - offsetX}% ${50 - offsetY}%` 
                }}/>
                {selectedSore && (
                <SoreCircle sore={selectedSore} imageDimensions={imageDimensions} selected={true}/>
            )}
                {cankerSores.filter(sore => sore.id !== selectedSore?.id).map((sore) => (
                    <SoreCircle 
                        sore={sore}
                        imageDimensions={imageDimensions}
                        selected={sore.id === selectedSore?.id}
                    />
                ))}

            </div>

        </div>
    )
}

export default ExistingSoresDiagram;
