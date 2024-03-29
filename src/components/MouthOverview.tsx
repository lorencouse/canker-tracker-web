import React from "react";
import { useNavigate } from "react-router-dom";
import "./MouthImage.css"
// import mouthDiagram from "../assets/images/mouthDiagram.png";


const MouthOverview: React.FC = () => {

    const navigate = useNavigate();


    return (
        <div className="mouth-image-container">
        <img src="../assets/images/mouthDiagramNoLabels.png" alt="Mouth Diagram Overview"/>

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