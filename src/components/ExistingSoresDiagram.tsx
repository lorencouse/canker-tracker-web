import React, { useEffect, useState, useRef } from "react";
import SoreCircle from "./SoreCircle";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadCankerSores } from "../services/firestoreService";
import { CankerSore } from "../types";
import SoreDetails from "./SoreDetails";
import SoreSliders from "./SoreSliders";

interface ExistingSoresDiagramProps {
    viewName: string;
}

function ExistingSoresDiagram({ viewName }: ExistingSoresDiagramProps) {
    const { selectedSore, setSelectedSore } = useCankerSores();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSize, setImageSize] = useState<number>(380);
    
    const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = imageRef.current?.getBoundingClientRect();

        if (!rect) return;

        const X = (event.clientX - rect.left) / rect.width;
        const Y = (event.clientY - rect.top) / rect.height;
        let nearestSore = null;
        let minDistance = Infinity;

        cankerSores.forEach(sore => {
            const soreX = sore.xCoordinateScaled ?? 0;
            const soreY = sore.yCoordinateScaled ?? 0;

            const dist = Math.sqrt(Math.pow(X - soreX, 2) + Math.pow(Y - soreY, 2));

            if (dist < minDistance) {
                minDistance = dist;
                nearestSore = sore
            }

        });

        setSelectedSore(nearestSore);
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
        <div className="existing-sores-digram">

        <div className="mouth-image-container">
                <img ref={imageRef} src={imageURL} alt="Mouth Diagram Overview" onLoad={updateImageSize} onClick={handleImageClick}/>
                {cankerSores.map((sore) => (
                
                <SoreCircle 
                    key={sore.id} 
                    id={sore.id} 
                    x={sore.xCoordinateScaled ? sore.xCoordinateScaled : 0}
                    y={sore.yCoordinateScaled ? sore.yCoordinateScaled : 0} 
                    size={sore.soreSize[sore.soreSize.length - 1] * (imageSize/200) ?? 1} 
                    pain={sore.painLevel[sore.painLevel.length - 1] ?? 1} 
                    selected={sore.id === selectedSore?.id ? true : false}
                />
                ))}

            </div>
            {/* {viewName !== "mouthDiagramNoLabels" <SoreSliders} */}
            {selectedSore && <SoreDetails sore={selectedSore} />}
        </div>
    )
}

export default ExistingSoresDiagram