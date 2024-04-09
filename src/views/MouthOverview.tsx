import React from "react";
import { useNavigate } from "react-router-dom";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";
import { useCankerSores } from "../context/CankerSoresContext";

const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const { selectedSore } = useCankerSores(); 
    const editButtonHandler = () => {
        if (selectedSore) {
            navigate('/edit-sore/');
        } else {
            alert("Please select a sore to edit.");
        }
    };


    return (
        <div className="mouth-overview">
            <ExistingSoresDiagram viewName="mouthDiagramNoLabels" />
            <div className="buttons">
                <button onClick={() => navigate('/select-zone')}>Add</button>
                <button onClick={editButtonHandler}>Edit</button>
            </div>
        </div>
    );
};

export default MouthOverview;
