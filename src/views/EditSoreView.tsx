import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";
import './MouthImage.css';
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";

const EditSoreView: React.FC = () => {
    const navigate = useNavigate();
    const [soreSize, setSoreSize] = useState(3);
    const [painLevel, setPainLevel] = useState(3);
    const { selectedSore } = useCankerSores();
    const handleSelectedSore = (sore: CankerSore) =>{
        setSoreSize(sore.soreSize[sore.soreSize.length - 1]);
        setPainLevel(sore.painLevel[sore.painLevel.length - 1]);

    }
    
    return (
        <div className="edit-sore-container">
            <ExistingSoresDiagram viewName={selectedSore?.locationImage ?? "leftCheek"} addMode={false} />
        </div>
    )


}

export default EditSoreView
