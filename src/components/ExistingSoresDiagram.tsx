import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { CankerSore } from "../types";
import { useCankerSores } from '../context/CankerSoresContext'; 
import { handleAddSoreClick, handleFindNearestSoreClick } from "../utilities/ClickHandlers";

interface ExistingSoresDiagramProps {
    addMode: boolean;
    editMode: boolean;
    cankerSores: CankerSore[];
    selectedSore: CankerSore | null;
}

function ExistingSoresDiagram({ addMode, editMode, cankerSores, selectedSore }: ExistingSoresDiagramProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);   
    const { setSelectedSore } = useCankerSores();
    const [ selectedZone, setSelectedZone ] = useState<string>("mouthDiagramNoLabels")
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [toggleGums, setToggleGums] = useState(false);  
    const imageName = toggleGums ? "GumsDiagram" : "mouthDiagramNoLabels";
    const buttonLabel = toggleGums ? "Switch to Lips" : "Switch to Gums"; 
    const imageURL: string = `../assets/images/${imageName}.png`


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (addMode && !zoomed) {
            handleSelectMouthZoneClick(event);
            setZoomed(true);
        } else if (editMode && zoomed) {
        handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
        console.log(cankerSores)
        } else if (addMode && zoomed) {
            handleAddSoreClick(event, selectedZone, toggleGums, setSelectedSore)
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
                viewName = "Left Cheek";
                localOffsetX = 50; 
                localOffsetY = 50;
            } else if (x < rect.width * 0.66) {
                viewName = "Upper Mouth";
                localOffsetX = -2;
                localOffsetY = 50;
            } else {
                viewName = "Right Cheek";
                localOffsetX = -50;
                localOffsetY = 50;
            }
        } else {
            if (x < rect.width * 0.33) {
                viewName = "Left Jaw";
                localOffsetX = 50;
                localOffsetY = -50;
            } else if (x < rect.width * 0.66) {
                viewName = "Lower Mouth";
                localOffsetX = -3;
                localOffsetY = -50;
            } else {
                viewName = "Right Jaw";
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
            case "Left Cheek":
                localOffsetX = 50; 
                localOffsetY = 50;
                break;
            case "Upper Mouth":
                localOffsetX = -2;
                localOffsetY = 50;
                break;
            case "Right Cheek":
                localOffsetX = -50;
                localOffsetY = 50;
                break;
            case "Left Jaw":
                localOffsetX = 50;
                localOffsetY = -50;
                break;
            case "Lower Mouth":
                localOffsetX = -3;
                localOffsetY = -50;
                break;
            case "Right Jaw":
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

    const handleGumsMode = () => {
        const newGumsVal = !toggleGums;
        setToggleGums(newGumsVal);

        if (selectedSore !== null) {
        let updatedSore = { ...selectedSore, gums:newGumsVal }
        setSelectedSore(updatedSore);
        } 
    }

    useEffect(() => {
        if (editMode && selectedSore) {
            setToggleGums(selectedSore.gums);
            zoomEditView(selectedSore.locationImage);
        } if (!addMode && !editMode) {
            setZoomed(false)
            zoomEditView("mouthDiagramNoLabels");
            setSelectedZone("mouthDiagramNoLabels");
            setToggleGums(false); 
        } if (selectedSore?.gums) {
            setToggleGums(true);
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
                <SoreCircle sore={selectedSore} imageDimensions={imageDimensions} selected={true} zoomed={zoomed} offsetX={offsetX} offsetY={offsetY}/>
            )}
                {cankerSores.filter(sore => sore.id !== selectedSore?.id).map((sore) => (
                    <SoreCircle 
                        sore={sore}
                        imageDimensions={imageDimensions}
                        selected={sore.id === selectedSore?.id}
                        zoomed={zoomed}
                        offsetX={offsetX}
                        offsetY={offsetY}
                    />
                ))}

            </div>
            {addMode && zoomed && <button onClick={ handleGumsMode }>{buttonLabel}</button>}

        </div>
    )
}

export default ExistingSoresDiagram;
