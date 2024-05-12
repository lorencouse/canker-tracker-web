import React, { useState, useEffect } from "react";
import "./MouthImage.css";
import SoreDiagram from "../components/Sore/SoreDiagram";
import SoreDetails from "../components/Sore/SoreDetails";
import SoreSliders from "../components/SoreSliders";
import { ZoneSelector } from "../components/ZoneSelector";
import useDailyLogChecker from "../Hooks/checkDailyLog";
import { SoreDiagramButtons } from "../components/Diagram/MouthDiagramButtons";
import { useSoreManager } from "../Hooks/useSoreManager";
import { CankerSore } from "../types";

const MouthOverview: React.FC = () => {
    const [selectedSore, setSelectedSore] = useState<CankerSore | null>()
    const {cankerSores, fetchSores, removeSore } = useSoreManager();
    const [dailyLogCompleted, checkDailyLogUptoDate] = useDailyLogChecker(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [addMode, setAddMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [soresToUpdate, setSoresToUpdate] = useState<number>(0);

    useEffect(() => {
        fetchSores();
        checkDailyLogUptoDate()

        if (!dailyLogCompleted && cankerSores.length > 0) {
            setSoresToUpdate(cankerSores.length - 1);
            setSelectedSore(cankerSores[soresToUpdate]);
            setEditMode(true);
        }

    }, []);

    const setSoreZone = (newZone: string) => {
        if (selectedSore) {
    let newSore = {...selectedSore, zone: newZone};
    setSelectedSore(newSore);
        }
    }

    return (

        <div className="mouth-overview">
            
            <SoreDiagram addMode={addMode} editMode={editMode} cankerSores={cankerSores} selectedSore={selectedSore} setSelectedSore={setSelectedSore}/>
            <h1>
            {addMode ? (selectedSore ? `Sore on ${selectedSore.zone}` : "Select a Location")
                    : (editMode ? `Edit Mode: ${selectedSore?.zone ?? ""}` : "Select or Add a Sore")}
            </h1>
            {/* <Filters /> */}

            <SoreDiagramButtons addMode={addMode} editMode={editMode} setAddMode={setAddMode} setEditMode={setEditMode} soresToUpdate={soresToUpdate} setSoresToUpdate={setSoresToUpdate}/>

            {selectedSore && (editMode || addMode) && (
            <div className="sore-editor-controls">
                <SoreSliders selectedSore={selectedSore} setSelectedSore={setSelectedSore}/>
            </div>
            )}



{/* Sore Details */}

        {selectedSore && !addMode && <SoreDetails sore={selectedSore} onDelete={() => removeSore} />}

        </div>
    );
};

export default MouthOverview;
