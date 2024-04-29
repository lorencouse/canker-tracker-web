import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { CankerSore } from "../../types";
import { handleAddSoreClick, handleFindNearestSoreClick, handleSelectMouthZoneClick } from "../../utilities/ClickHandlers";
import Button from "../Button";
import mouthDiagramImage from '../../assets/images/mouthDiagramNoLabels.png'
import gumsDiagramImage from '../../assets/images/GumsDiagram.png'

interface SoreDiagramProps {
    addMode: boolean;
    editMode: boolean;
    cankerSores: CankerSore[];
    selectedSore: CankerSore | null;
    setSelectedSore: (sore: CankerSore | null) => void;
}

function SoreDiagram({ addMode, editMode, cankerSores, selectedSore, setSelectedSore }: SoreDiagramProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [zoomed, setZoomed] = useState<number>(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);   
    const [ selectedZone, setSelectedZone ] = useState<string>("mouthDiagramNoLabels")
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [toggleGums, setToggleGums] = useState(false);  
    const imageURL = toggleGums ? gumsDiagramImage : mouthDiagramImage;
    const buttonLabel = toggleGums ? "Switch to Mouth" : "Switch to Gums"; 

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (addMode && zoomed === 1) {
            handleSelectMouthZoneClick(event, setSelectedZone, setZoomed, zoomToSore);
            setZoomed(2);
        } else if (editMode && zoomed !== 1) {
        handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
        console.log(cankerSores)
        } else if (addMode && zoomed !== 1) {
            handleAddSoreClick(event, selectedZone, toggleGums, setSelectedSore)
        }else {
            handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
        }
    };

    function zoomToSore(x: number, y: number) {
        let xPercent = x * 100;
        let yPercent = y * 100;
        let newOffsetX = (xPercent - 50) * -zoomed;
        let newOffsetY = (yPercent - 50) * -zoomed;
 
        setOffsetX(newOffsetX)
        setOffsetY(newOffsetY)
    }

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
            setZoomed(2);
            zoomToSore(selectedSore.xCoordinate || 0, selectedSore.yCoordinate || 0);
        } if (!addMode && !editMode) {
            setZoomed(1);
            setToggleGums(false); 
            zoomToSore(0,0);
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
                    transform: `scale(${zoomed})`, 
                    transformOrigin: `${50 - offsetX}% ${50 - offsetY}%` 
                }}/>
                {selectedSore && (
                <SoreCircle sore={selectedSore} imageDimensions={imageDimensions} selected={true} zoomed={zoomed} offsetX={offsetX} offsetY={offsetY} setSelectedSore={setSelectedSore}/>
            )}
                {cankerSores.filter(sore => sore.id !== selectedSore?.id).map((sore) => (
                    <SoreCircle 
                        sore={sore}
                        imageDimensions={imageDimensions}
                        selected={sore.id === selectedSore?.id}
                        zoomed={zoomed}
                        offsetX={offsetX}
                        offsetY={offsetY}
                        setSelectedSore={setSelectedSore}
                    />
                ))}

            </div>
            { zoomed !== 0 && <Button label={buttonLabel} action={ handleGumsMode} />}

        </div>
    )
}

export default SoreDiagram;
