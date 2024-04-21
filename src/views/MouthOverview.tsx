import React, { useState, useEffect } from "react";
import "./MouthImage.css";
import SoreDiagram from "../components/SoreDiagram";
import { CankerSore } from "../types";
import { useCankerSores } from "../context/CankerSoresContext";
import { loadSores, clearAllSores, deleteSore } from "../services/firestoreService";
import SoreDetails from "../components/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { saveSore } from '../services/firestoreService'; 
import { Filters, FilterBy } from "../components/Filters";
import { ZoneSelector } from "../components/ZoneSelector";

const MouthOverview: React.FC = () => {
    const [addMode, setAddMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const { selectedSore, setSelectedSore } = useCankerSores();
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 
    const [filterBy, setFilterBy] = useState<FilterBy>({});
    const [filterdSores, setFilteredSores] = useState<CankerSore[]>(cankerSores)

    const fetchSores = async () => {
        try {
                const loadedSores = await loadSores("mouthDiagramNoLabels");
                setCankerSores(loadedSores);
        } catch (error) {
                console.log("Could not refresh sores" + error)
            }
    };


    useEffect(() => {
        fetchSores();
    }, []);

    const filterSores = (cankerSores: CankerSore[], filterBy: FilterBy, filterdSores: CankerSore[], setFilteredSores: () => void) => {
        
    }


    // Button Handlers

    function addButtonHandler() {
        setSelectedSore(null);
        setAddMode(true);
    }

    async function addMoreButtonHandler() {
        if (selectedSore) {
            try {
                await saveSore(selectedSore);
                fetchSores();
            } catch (error) {
                console.error("Failed to save sore and navigate:", error);
            }
        } else {
            alert("Please click image to select sore location.")
        }
    }

    const editButtonHandler = () => {
        if (selectedSore) {
            setEditMode(true);
        } else {
            alert("Please select a sore to edit.");
        }
    };

    async function finishEditingButtonHandler() {
        if (selectedSore) {
            try {
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

    async function finishAddingButtonHandler() {
        if (selectedSore) {
            try {
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

    async function deleteSoreButtonHandler() {
        if (selectedSore) {
            try {
                await deleteSore(selectedSore.id);
                setSelectedSore(null);
                fetchSores();
            } catch (error) {
                console.error("Failed to delete sore: ", error)
            } 
        } else {
                alert("Please select a sore to delete.")
            }
        
    }

    async function deletedAllButtonHandler() {
        const allCankerSores = cankerSores;
        const selectedSoreBackup = selectedSore;
        if (window.confirm("Are you sure you want to delete all cankersores?")) {
            try {
                setCankerSores([])
                setSelectedSore(null)
                await clearAllSores();
            } catch {
                setCankerSores(allCankerSores)
                setSelectedSore(selectedSoreBackup)
                console.error("Failed to clear", Error);
                alert("Clear failed.  Check console for details.")
            }
        }
    }

    const setSoreZone = (newZone: string) => {
        if (selectedSore) {
    let newSore = {...selectedSore, zone: newZone};
    setSelectedSore(newSore);
        }
    }


    return (
        <div className="mouth-overview">
            
            <SoreDiagram addMode={addMode} editMode={editMode} cankerSores={cankerSores} selectedSore={selectedSore}/>
            <h1>{(addMode && !selectedSore) ? "Select a Location" : (addMode && selectedSore) ? `Sore on ${selectedSore.zone}` : editMode ? `Edit Mode${`: ${selectedSore?.zone ?? ""}`}` : "Select or Add a Sore"}</h1>

            <Filters />

            {(editMode || addMode) && selectedSore && (
            <div className="sore-editor-controls">    
            <SoreSliders 
                soreSize={selectedSore ? selectedSore.soreSize[0] : 3}
                setSoreSize={(size: number) => {
                    const newSore = selectedSore ? { ...selectedSore, soreSize: [size] } : null;
                    setSelectedSore(newSore);
                }}
                painLevel={selectedSore ? selectedSore.painLevel[0] : 3} 
                setPainLevel={(level: number) => {
                    const newSore = selectedSore ? { ...selectedSore, painLevel: [level] } : null;
                    setSelectedSore(newSore);
                }}
            />

            <ZoneSelector onChange={ setSoreZone } zone={selectedSore.zone}/> </div> )
            }

    {/* Buttons for Add, Edit, Delete, Finish */}
            {addMode && ( <div className="add-sore-buttons">
                <button onClick={ finishAddingButtonHandler }>{selectedSore ? "Finish Adding" : "Go Back"}</button>
                {selectedSore && <button onClick={ addMoreButtonHandler }>Add More</button>} 
            </div>)}

            {!addMode && !editMode && !selectedSore && ( <div className="overview-buttons">
                <button onClick={ addButtonHandler }>Add</button>
                <button onClick= { deletedAllButtonHandler }>Delete all</button>
            </div> )}

            {!addMode && !editMode && selectedSore && ( <div className="overview-buttons">
                <button onClick={ addButtonHandler }>Add</button>
                <button onClick={ editButtonHandler }>Edit</button>
                <button onClick={ deleteSoreButtonHandler }>Delete</button>
                <button onClick= { deletedAllButtonHandler }>Delete all</button>
                <Filters filterBy={filterBy} setFilterBy={setFilterBy} />
            </div> )}

            {editMode && ( <div className="edit-sore-buttons">
                <button onClick={ finishEditingButtonHandler }>Finish</button>
                <button onClick={ deleteSoreButtonHandler }>Delete</button>
            </div>)}

            {selectedSore && !addMode && <SoreDetails sore={selectedSore} onDelete={deleteSoreButtonHandler} />}


        </div>
    );
};

export default MouthOverview;
