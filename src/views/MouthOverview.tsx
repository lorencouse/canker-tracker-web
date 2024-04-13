import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadSores, clearAllSores, deleteSore } from "../services/firestoreService";
import SoreDetails from "../components/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { saveSore } from '../services/firestoreService'; 
import { async } from "@firebase/util";
import { error } from "console";


const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [viewName, setViewName] = useState<string>("mouthDiagramNoLabels")
    const [addMode, setAddMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const { selectedSore } = useCankerSores(); 
    const { setSelectedSore: setSelectedSoreContext } = useCankerSores();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 

    useEffect(() => {
        const fetchSores = async () => {
            const loadedSores = await loadSores(viewName);
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

    function addButtonHandler() {
        setAddMode(true)
    }

    const editButtonHandler = () => {
        if (selectedSore) {
            setCankerSores([])
            setEditMode(true)
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

    async function deletedAllButtonHandler() {
        if (window.confirm("Are you sure you want to delete all cankersores?")) {
            try {
                await clearAllSores();
                setCankerSores([])
                setSelectedSoreContext(null)
            } catch {
                console.error("Failed to clear", Error);
                alert("Clear failed.  Check console for details.")
            }
        }
    }

    async function finishAddingButtonHandler() {
        if (selectedSore) {
            try {
                setSelectedSoreContext(null)
                setAddMode(false);
                await saveSore(selectedSore);
            } catch (error) {
                console.error("Failed to finish adding:", error);
            }
        } else {
                setAddMode(false);
        }
    }

    async function finishEditingButtonHandler() {
        if (selectedSore) {
            try {
                setSelectedSoreContext(null)
                // setViewName("mouthDiagramNoLabels");
                setEditMode(false)
                await saveSore(selectedSore);
            } catch (error) {
                console.error("Failed to update:", error);
            }
        } else {
                setEditMode(false)
                // setViewName("mouthDiagramNoLabels");
        }
    }

    async function deleteSoreButtonHandler() {
        if (selectedSore) {
            try {
                await deleteSore(selectedSore.id);
                setSelectedSoreContext(null);
                setViewName("mouthDiagramNoLabels");
            } catch (error) {
                console.error("Failed to delete sore: ", error)
            } 
        } else {
                alert("Please select a sore to delete.")
            }
        
    }


    return (
        <div className="mouth-overview">
            
            <ExistingSoresDiagram viewName={viewName} addMode={addMode} editMode={editMode} cankerSores={cankerSores} selectedSore={selectedSore}/>

            {selectedSore && !addMode && <SoreDetails sore={selectedSore} />}

            {addMode && <h1>Select Sore Location</h1>}

            {(editMode || addMode) && 
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
            }

            {addMode && ( <div className="add-sore-buttons">
                <button onClick={ finishAddingButtonHandler }>Finish</button>
                <button onClick={ addMoreButtonHandler }>Add More</button>
            </div>)}

            {!addMode && !editMode && ( <div className="overview-buttons">
                <button onClick={ addButtonHandler }>Add</button>
                <button onClick={ editButtonHandler }>Edit</button>
                <button onClick= { deletedAllButtonHandler }>Clear all</button>
            </div> )}

            {editMode && ( <div className="edit-sore-buttons">
                <button onClick={ finishEditingButtonHandler }>Finish</button>
                <button onClick={ deleteSoreButtonHandler }>Delete</button>
            </div>)}




        </div>
    );
};

export default MouthOverview;
