import React, { useState, useEffect } from "react";
import "./MouthImage.css";
import SoreDiagram from "../components/Sore/SoreDiagram";
import { CankerSore } from "../types";
import { loadSores, clearAllSores, deleteSore, saveData } from "../services/firestoreService";
import SoreDetails from "../components/Sore/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { Filters, FilterBy } from "../components/Filters";
import { ZoneSelector } from "../components/ZoneSelector";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useDailyLogChecker from "../Hooks/checkDailyLog";
import { useSoreManager } from "../Hooks/useSoreManager";

const MouthOverview: React.FC = () => {
    const navigate = useNavigate();
    const { cankerSores, selectedSore, setSelectedSore, fetchSores, addSore, updateSore, updateSoreNewDay, removeSore, removeAllSores } = useSoreManager();

    const [addMode, setAddMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [dailyLogCompleted, checkDailyLogUptoDate] = useDailyLogChecker(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [soresToUpdate, setSoresToUpdate] = useState<number>(0);

    useEffect(() => {
        fetchSores();
        checkDailyLogUptoDate()

        if (!dailyLogCompleted && loadSores.length > 0) {
                    setSoresToUpdate(cankerSores.length - 1);
                    setSelectedSore(cankerSores[soresToUpdate]);
                    setEditMode(true);
        }

    }, []);

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
            setSoresToUpdate(soresToUpdate => soresToUpdate - 1);
            setSelectedSore(cankerSores[soresToUpdate]);

        } 
        
        else {
                setEditMode(false);
                setIsDialogOpen(true);
        }
    }

    // function updateSoreLog() {
    //     if ( selectedSore ) {
    //         const oldSore = cankerSores.find( sore => sore.id === selectedSore.id);
    //         if (oldSore) {
    //             const newSore: CankerSore = {...oldSore, 
    //             soreSize: oldSore.soreSize.concat(selectedSore?.soreSize), 
    //             painLevel: oldSore.painLevel.concat(selectedSore?.painLevel), 
    //             lastUpdated: oldSore.lastUpdated.concat(new Date()) 
    //         };
    //         updateSore(newSore);
    //         }

    //     }

    // }

    async function finishAddingButtonHandler() {
        if (selectedSore) {
            try {
                setAddMode(false);
                await saveData("cankerSores", selectedSore.id, selectedSore);
                if (!dailyLogCompleted) {
                    navigate('/daily-log');
                    
                } else {
                    // const newCankerSores = [...cankerSores, selectedSore];                
                    // setCankerSores(newCankerSores);
                    fetchSores();
                }

            } catch (error) {
                console.error("Failed to finish adding:", error);
            }
        } else {
                setAddMode(false);
        }
    }

    async function deletedAllButtonHandler() {
        if (window.confirm("Are you sure you want to delete all cankersores?")) {
            removeAllSores();
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

            {isDialogOpen && (
                <div className="dialog">
                    <p>Do you have any new sores?</p>
                    <button onClick={() => setAddMode(true)}>Yes</button>
                    <button onClick={ () => navigate('/daily-log') }>No</button>
                </div>
            )}
            
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

{/* Sore Details */}

        {selectedSore && !addMode && <SoreDetails sore={selectedSore} onDelete={() => removeSore} />}


        </div>
    );
};

export default MouthOverview;
