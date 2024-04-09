import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";
import { useCankerSores } from "../context/CankerSoresContext";

const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedSore } = useCankerSores(); 
    const [viewName, setViewName] = useState<string>("mouthDiagramNoLabels")
    const [addMode, setAddMode] = useState<boolean>(false)

    useEffect(() => {
        if (location.state) {
            const { viewName, addMode } = location.state as { viewName: string, addMode: boolean };
            setViewName(viewName);
            setAddMode(addMode);
        }
    }, [location]);

    const editButtonHandler = () => {
        if (selectedSore) {
            setViewName(selectedSore.locationImage)
        } else {
            alert("Please select a sore to edit.");
        }
    };


    return (
        <div className="mouth-overview">
            <ExistingSoresDiagram viewName={viewName} addMode={addMode}/>
            <div className="buttons">
                <button onClick={() => navigate('/select-zone')}>Add</button>
                <button onClick={editButtonHandler}>Edit</button>
            </div>
        </div>
    );
};

export default MouthOverview;
