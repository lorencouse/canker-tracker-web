import React, { useState, useEffect } from "react";
import "./MouthImage.css";
import SoreDiagram from "../components/Sore/SoreDiagram";
import { CankerSore } from "../types";
// import { useCankerSores } from "../context/CankerSoresContext";
import { loadSores, clearAllSores, deleteSore, saveSore, saveData } from "../services/firestoreService";
import SoreDetails from "../components/Sore/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { Filters, FilterBy } from "../components/Filters";
import { ZoneSelector } from "../components/ZoneSelector";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const MouthOverview: React.FC = () => {
    const [addMode, setAddMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [ selectedSore, setSelectedSore ] = useState<CankerSore | null>(null);
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]); 
    const [filterBy, setFilterBy] = useState<FilterBy>({});
    const [unfilterdSores, setUnfilteredSores] = useState<CankerSore[]>(cankerSores);
    const navigate = useNavigate();

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

    // Button Handlers

    function addButtonHandler() {
        setSelectedSore(null);
        setAddMode(true);
    }

    async function addMoreButtonHandler() {
        if (selectedSore) {
            try {
                await saveData("cankerSores", selectedSore.id, selectedSore)
                const newCankerSores = [...cankerSores, selectedSore];
                setCankerSores(newCankerSores);
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
                await saveData("cankerSores", selectedSore.id, selectedSore)
                setEditMode(false);
                let newCankerSores = cankerSores.filter(sore => sore.id !== selectedSore.id);
                newCankerSores.push(selectedSore);
                setCankerSores(newCankerSores);
                
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
                await saveData("cankerSores", selectedSore.id, selectedSore)
                const newCankerSores = [...cankerSores, selectedSore];                
                setCankerSores(newCankerSores);
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
                const newCankerSores = cankerSores.filter(sore => sore.id !== selectedSore.id);
                setCankerSores(newCankerSores)
                setSelectedSore(null);
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
            
            <SoreDiagram addMode={addMode} editMode={editMode} cankerSores={cankerSores} selectedSore={selectedSore} setSelectedSore={setSelectedSore}/>
            <h1>{(addMode && !selectedSore) ? "Select a Location" : (addMode && selectedSore) ? `Sore on ${selectedSore.zone}` : editMode ? `Edit Mode${`: ${selectedSore?.zone ?? ""}`}` : "Select or Add a Sore"}</h1>

            {/* <Filters /> */}

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
{addMode && (
    <div className="add-sore-buttons">
        <Button label={selectedSore ? "Finish Adding" : "Go Back"} action={finishAddingButtonHandler} />
        {selectedSore && <Button label={"Add More"} action={addMoreButtonHandler} />}
    </div>
)}

{!addMode && !editMode && !selectedSore && (
    <div className="overview-buttons">
        <Button label={"Add"} action={addButtonHandler} />
        <Button label={"Delete all"} action={deletedAllButtonHandler} />
        <Button label={"Daily Log"} action={() => navigate("daily-log")} />
    </div>
)}

{!addMode && !editMode && selectedSore && (
    <div className="overview-buttons">
        <Button label={"Add"} action={addButtonHandler} />
        <Button label={"Edit"} action={editButtonHandler} />
        <Button label={"Delete"} action={deleteSoreButtonHandler} />
        <Button label={"Delete all"} action={deletedAllButtonHandler} />
    </div>
)}

{editMode && (
    <div className="edit-sore-buttons">
        <Button label={"Finish"} action={finishEditingButtonHandler} />
        <Button label={"Delete"} action={deleteSoreButtonHandler} />
    </div>
)}


            {selectedSore && !addMode && <SoreDetails sore={selectedSore} onDelete={deleteSoreButtonHandler} />}


        </div>
    );
};

export default MouthOverview;
