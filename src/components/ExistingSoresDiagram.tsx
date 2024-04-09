import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadCankerSores } from "../services/firestoreService";
import { CankerSore } from "../types";
import SoreDetails from "./SoreDetails";
import SoreSliders from "./SoreSliders";
import { handleAddSoreClick } from "../utilities/AddSoreClick";
import { handleFindNearestSoreClick } from "../utilities/NearestSoreClick";

interface ExistingSoresDiagramProps {
    viewName: string;
    addMode: boolean
}

function ExistingSoresDiagram({ viewName, addMode }: ExistingSoresDiagramProps) {
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 
    const [selectedSore, setSelectedSore] = useState<CankerSore | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSize, setImageSize] = useState<number>(380);
    const { setSelectedSore: setSelectedSoreContext } = useCankerSores();


    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (addMode) {
            handleAddSoreClick(event, viewName, setSelectedSore);
        } else {
            handleFindNearestSoreClick(event, cankerSores, setSelectedSore, imageRef);
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

    useEffect(() => {
        const fetchSores = async () => {
            const loadedSores = await loadCankerSores(viewName);
            setCankerSores(loadedSores);
        };

        fetchSores();
    }, []);

    const imageURL = `../assets/images/${viewName}.png`
    
    return (
        <div className="existing-sores-diagram">
            <div className="mouth-image-container">
                <img ref={imageRef} src={imageURL} alt="Mouth Diagram Overview" onLoad={updateImageSize} onClick={handleImageClick}/>
                {cankerSores.map((sore) => (
                    <SoreCircle 
                        key={sore.id} 
                        id={sore.id} 
                        x={viewName === "mouthDiagramNoLabels" ? (sore.xCoordinateScaled ?? 0) : (sore.xCoordinateZoomed ?? 0)}
                        y={viewName === "mouthDiagramNoLabels" ? (sore.yCoordinateScaled ?? 0) : (sore.yCoordinateZoomed ?? 0)} 
                        size={sore.soreSize[sore.soreSize.length - 1] ?? 1} 
                        pain={sore.painLevel[sore.painLevel.length - 1] ?? 1} 
                        selected={sore.id === selectedSore?.id ? true : false}
                    />
                ))}
                {selectedSore && (
                <SoreCircle id="" x={selectedSore.xCoordinateZoomed ?? 0} y={selectedSore.yCoordinateZoomed ?? 0} size={selectedSore.soreSize[0]} pain={selectedSore.painLevel[0]} selected={false}/>
            )}
            </div>



            {selectedSore && <SoreDetails sore={selectedSore} />}

            {viewName !== "mouthDiagramNoLabels" && selectedSore && (
                <SoreSliders 
                    soreSize={selectedSore.soreSize[0]}
                    setSoreSize={(size: number) => setSelectedSore(prevState => prevState ? ({...prevState, soreSize: [size]}) : null)}
                    painLevel={selectedSore.painLevel[0]}
                    setPainLevel={(level: number) => setSelectedSore(prevState => prevState ? ({...prevState, painLevel: [level]}) : null)}
                />
            )}

        </div>
    )
}

export default ExistingSoresDiagram;
