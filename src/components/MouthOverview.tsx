import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./MouthImage.css"
import { CankerSore } from "../types";
import { loadAllCankerSores, loadData } from "../services/firestoreService";
import SoreCircle from "./SoreCircle";



const MouthOverview: React.FC = () => {

    const navigate = useNavigate();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([])

    useEffect(() => {

        const fetchSores = async () => {

            const loadedSores = await loadAllCankerSores()
            setCankerSores(loadedSores);
        };

        fetchSores();
        

    }, []);



    return (
        <div className="mouth-overview">

        <div className="mouth-image-container">
        <img src="../assets/images/mouthDiagramNoLabels.png" alt="Mouth Diagram Overview"/>

        {cankerSores.map( (sore, index) => (
                <SoreCircle id={sore.id} x={sore.xCoordinateScaled ?? 0} y={sore.yCoordinateScaled ?? 0} size={sore.soreSize[sore.soreSize.length - 1]} pain={sore.painLevel[sore.painLevel.length - 1]} />
            ) )}

        </div>

        <div className="buttons" >
        <button onClick={() => navigate('/select-zone')}>
            Add
        </button>
        <button>
            Edit
        </button>
        </div>


        </div>



    );

    
}

export default MouthOverview