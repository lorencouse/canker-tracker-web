import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MouthImage.css";
import { CankerSore } from "../types";
import { loadAllCankerSores } from "../services/firestoreService";
import SoreCircle from "./SoreCircle";

const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]);
    const imageRef = useRef<HTMLImageElement>(null); 
    const [imageSize, setImageSize] = useState<number>(380)


// Reraw dots on window resize. 
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
            const loadedSores = await loadAllCankerSores();
            setCankerSores(loadedSores);
        };

        fetchSores();
    }, []);


    return (
        <div className="mouth-overview">
            <div className="mouth-image-container">
                <img ref={imageRef} src="../assets/images/mouthDiagramNoLabels.png" alt="Mouth Diagram Overview" onLoad={updateImageSize}/>
                {cankerSores.map((sore) => (
                    

                <SoreCircle 
                    key={sore.id} 
                    id={sore.id} 
                    x={sore.xCoordinateScaled ? sore.xCoordinateScaled * imageSize : 0}
                    y={sore.yCoordinateScaled ? sore.yCoordinateScaled * imageSize : 0} 
                    size={sore.soreSize[sore.soreSize.length - 1] ?? 1} 
                    pain={sore.painLevel[sore.painLevel.length - 1] ?? 1} 
                />
                ))}
            </div>
            <div className="buttons">
                <button onClick={() => navigate('/select-zone')}>Add</button>
                <button>Edit</button>
            </div>
        </div>
    );
};

export default MouthOverview;
