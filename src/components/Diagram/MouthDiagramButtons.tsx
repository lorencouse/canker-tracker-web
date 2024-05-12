import React from "react"
import Button from "../Button"
import { saveData } from "../../services/firestoreService";
import { useNavigate } from "react-router-dom";
import { useSoreManager } from "../../Hooks/useSoreManager";

interface SoreDiagramButtonsProps {
    addMode: boolean;
    editMode: boolean;
    soresToUpdate: number;
    setAddMode: (mode: boolean) => void, 
    setEditMode: (mode: boolean) => void,
    setSoresToUpdate: (sores: number) => void
}


export const SoreDiagramButtons = ( {addMode, setAddMode, editMode, setEditMode, soresToUpdate, setSoresToUpdate}: SoreDiagramButtonsProps ) => {
    const navigate = useNavigate();

    const {
        cankerSores, setCankerSores, selectedSore, setSelectedSore,
        addSore, updateSore, removeSore,
        removeAllSores, updateSoreNewDay
    } = useSoreManager();
    
    // const { addMode, setAddMode, editMode, setEditMode, soresToUpdate, setSoresToUpdate} = useModes();

    const dailyLogCompleted = true;

        // Button Handlers

    function addButtonHandler() {
        setSelectedSore(null);
        setAddMode(true);
    }

    async function addMoreButtonHandler() {
        if (selectedSore) {
            try {
                addSore(selectedSore);
                
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
                setAddMode(false);
                await saveData("cankerSores", selectedSore.id, selectedSore);
                if (!dailyLogCompleted) {
                    navigate('/daily-log');
                    
                } else {
                    const newCankerSores = [...cankerSores, selectedSore];                
                    setCankerSores(newCankerSores);
                    // fetchSores();
                }

            } catch (error) {
                console.error("Failed to finish adding:", error);
            }
        } else {
                setAddMode(false);
        }
    }

    const editButtonHandler = () => {
        if (selectedSore) {
            setEditMode(true);
        } else {
            alert("Please select a sore to edit.");
        }
    };


    function finishEditingButtonHandler() {
        if (selectedSore) {
            try {
                updateSore(selectedSore);
                setEditMode(false);
                
            } catch (error) {
                console.error("Failed to update:", error);
            }
        } else {
                setEditMode(false)
        }
    }

    async function updateButtonHandler() {

        if (selectedSore  && soresToUpdate > 0) {
            try {
                if (selectedSore.soreSize.length > 0 && selectedSore.soreSize[selectedSore.soreSize.length - 1] === 0) {
                    await saveData("healedCankerSores", selectedSore.id, selectedSore)
                    removeSore();
                } else {
                    updateSoreNewDay();
                }

            } catch (error) {
                console.error("Failed to update:", error);
                return;
            }
            const newSoresToUpdate = soresToUpdate - 1;
            setSoresToUpdate(newSoresToUpdate);

            setSelectedSore(cankerSores[soresToUpdate]);

        } 
        
        else {
                setEditMode(false);
                // setIsDialogOpen(true);
        }
    }

        async function deletedAllButtonHandler() {
        if (window.confirm("Are you sure you want to delete all cankersores?")) {
            removeAllSores();
        }
    }


    return (
        <div className="mouth-digram0buttons">
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
        <Button label={"Daily Log"} action={() => navigate("/daily-log")} />
    </div>
)}

{!addMode && !editMode && selectedSore && (
    <div className="overview-buttons">
        <Button label={"Add"} action={addButtonHandler} />
        <Button label={"Edit"} action={editButtonHandler} />
        <Button label={"Delete"} action={removeSore} />
        <Button label={"Delete all"} action={deletedAllButtonHandler} />
    </div>
)}

{!dailyLogCompleted && editMode && 
    (
        <div id='update-sore-buttons'>
            <Button label={"Update"} action={updateButtonHandler} />
        </div>
    )
}

{editMode && (
    <div className="edit-sore-buttons">
        <Button label={"Finish"} action={finishEditingButtonHandler} />
        <Button label={"Delete"} action={() => removeSore} />
    </div>
)}
        </div>
    )
}

