import React from "react";
import { useNavigate } from "react-router-dom";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";

const MouthOverview: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="mouth-overview">
            <ExistingSoresDiagram viewName="mouthDiagramNoLabels" />
            <div className="buttons">
                <button onClick={() => navigate('/select-zone')}>Add</button>
                <button onClick={() => navigate('/edit-sore')}>Edit</button>
            </div>
        </div>
    );
};

export default MouthOverview;
