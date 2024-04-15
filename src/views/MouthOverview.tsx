import React, { useState, useEffect } from "react";
import "./MouthImage.css";
import ExistingSoresDiagram from "../components/ExistingSoresDiagram";
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadSores, clearAllSores, deleteSore } from "../services/firestoreService";
import SoreDetails from "../components/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { saveSore } from '../services/firestoreService'; 


const MouthOverview: React.FC = () => {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const { selectedSore } = useCankerSores(); 
    const { setSelectedSore: setSelectedSoreContext } = useCankerSores();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 

    const fetchSores = async () => {
        try {
                const loadedSores = await loadSores("mouthDiagramNoLabels");
                setCankerSores(loadedSores);
        } catch (error) {
                console.log("Could not refresh sores" + error)
            }
    };


    // Button Handlers

    function addButtonHandler() {
        setAddMode(true)
    }

    const editButtonHandler = () => {
        if (selectedSore) {
            setEditMode(true)
        } else {
            alert("Please select a sore to edit.");
        }
    };

    async function addMoreButtonHandler() {
        if (selectedSore) {
            try {
                await saveSore(selectedSore);
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
                fetchSores();
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
                setSelectedSoreContext(null);
                setEditMode(false);
                await saveSore(selectedSore);
                fetchSores();
            } catch (error) {
                console.error("Failed to update:", error);
            }
        } else {
                setEditMode(false)
        }
    }

    async function deleteSoreButtonHandler() {
        if (selectedSore) {
            try {
                await deleteSore(selectedSore.id);
                setSelectedSoreContext(null);
                fetchSores();
            } catch (error) {
                console.error("Failed to delete sore: ", error)
            } 
        } else {
                alert("Please select a sore to delete.")
            }
        
    }


    return (
        <div className="mouth-overview">
            
            <ExistingSoresDiagram addMode={addMode} editMode={editMode} cankerSores={cankerSores} selectedSore={selectedSore}/>

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
