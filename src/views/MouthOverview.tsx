import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadCankerSores } from "../services/firestoreService";
import SoreDetails from "../components/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { saveSore } from '../services/firestoreService'; 


const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [viewName, setViewName] = useState<string>("mouthDiagramNoLabels")
    const [addMode, setAddMode] = useState<boolean>(false)
    const { selectedSore } = useCankerSores(); 
    const { setSelectedSore: setSelectedSoreContext } = useCankerSores();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 

    useEffect(() => {
        const fetchSores = async () => {
            const loadedSores = await loadCankerSores(viewName);
            setCankerSores(loadedSores);
        };

        fetchSores();
    }, [viewName]);

    useEffect(() => {
        if (location.state) {
            const { viewName, addMode, selectedSore } = location.state as { viewName: string, addMode: boolean, selectedSore: CankerSore };
            setViewName(viewName);
            setAddMode(addMode);
            setSelectedSoreContext(selectedSore)
        }
    }, [location]);


    // Button Handlers

    const editButtonHandler = () => {
        if (selectedSore) {
            setViewName(selectedSore.locationImage)
        } else {
            alert("Please select a sore to edit.");
        }
    };

async function addMoreButtonHandler() {
    if (selectedSore) {
        try {
            await saveSore(selectedSore);
            navigate('/select-zone');
        } catch (error) {
            console.error("Failed to save sore and navigate:", error);
        }
    } else {
        alert("Please click image to select sore location.")
    }
}

async function finishAddingButtonHandler() {
    if (selectedSore) {
        try {
            await saveSore(selectedSore);
            setAddMode(false);
            setViewName("mouthDiagramNoLabels");
        } catch (error) {
            console.error("Failed to finish adding:", error);
        }
    } else {
        alert("Please click image to select sore location.")
    }
}

async function finishEditingButtonHandler() {
    if (selectedSore) {
        try {
            await saveSore(selectedSore);
            setViewName("mouthDiagramNoLabels");
        } catch (error) {
            console.error("Failed to update:", error);
        }
    } else {
        alert("Please click image to select sore location.")
    }
}


    return (
        <div className="mouth-overview">
            
            <ExistingSoresDiagram viewName={viewName} addMode={addMode} cankerSores={cankerSores} selectedSore={selectedSore}/>

            {selectedSore && <SoreDetails sore={selectedSore} />}

            {viewName !== "mouthDiagramNoLabels" && selectedSore && (
            <SoreSliders 
                soreSize={selectedSore ? selectedSore.soreSize[0] : 3}
                setSoreSize={(size: number) => {
                    const newSore = selectedSore ? { ...selectedSore, soreSize: [size] } : null;
                    setSelectedSoreContext(newSore);
                }}
                painLevel={selectedSore ? selectedSore.painLevel[0] : 3} 
                setPainLevel={(level: number) => {
                    const newSore = selectedSore ? { ...selectedSore, painLevel: [level] } : null;
                    setSelectedSoreContext(newSore);
                }}
            />
            )}

            {addMode && viewName !== "mouthDiagramNoLabels" && ( <div className="add-sore-buttons">
                <button onClick={ finishAddingButtonHandler }>Finish</button>
                <button onClick={ addMoreButtonHandler }>Add More</button>
            </div>)}

            {viewName === "mouthDiagramNoLabels" && ( <div className="overview-buttons">
                <button onClick={() => navigate('/select-zone')}>Add</button>
                <button onClick={ editButtonHandler }>Edit</button>
            </div> )}

            {!addMode && viewName !== "mouthDiagramNoLabels" && ( <div className="edit-sore-buttons">
                <button onClick={ finishEditingButtonHandler }>Finish</button>
            </div>)}




        </div>
    );
};

export default MouthOverview;
