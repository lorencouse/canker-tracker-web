import { useState } from "react";
import { clearAllSores, loadSores, saveData, deleteSore } from "../services/firestoreService";
import { CankerSore } from "../types";


export function useSoreManager() {
    const [cankerSores, setCankerSores] = useState<CankerSore[]>([]);
    const [selectedSore, setSelectedSore ] = useState<CankerSore | null>(null);


    const fetchSores = async () => {

        try {
        const sores = await loadSores("mouthDiagramNoLabels");  
        setCankerSores(sores);
        } catch (error) {
            console.log("Failed to load sores: " + error)
        }

    }   

    const addSore = async (sore: CankerSore) => {
        try {
            await saveData("cankerSores", sore.id, sore);
            setCankerSores(cankerSores => [...cankerSores, sore]);
        } catch (error) {
            console.error("Failed to add sore", error);
        }

    }

    const updateSore = async (sore: CankerSore) => {
        try {
            await saveData("cankerSores", sore.id, sore);
            setCankerSores( sorecankerSoress => cankerSores.map(s => s.id === sore.id ? sore: s) )
        } catch (error) {
            console.log("Failed to update sore: " + error)
        }

    }

    const removeSore = async () => {
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

    const removeAllSores = async () => {
        try {
            await clearAllSores();
            setCankerSores([]);
        } catch (error) {
            console.log("Could not remove sores:" + error)
        }

    };

    const updateSoreNewDay = () =>  {
        if ( selectedSore ) {
            const oldSore = cankerSores.find( sore => sore.id === selectedSore.id);
            if (oldSore) {
                const newSore: CankerSore = {...oldSore, 
                soreSize: oldSore.soreSize.concat(selectedSore?.soreSize), 
                painLevel: oldSore.painLevel.concat(selectedSore?.painLevel), 
                lastUpdated: oldSore.lastUpdated.concat(new Date()) 
            };
            updateSore(newSore);
            }

        }

    }


    return {cankerSores, selectedSore, setCankerSores, fetchSores, addSore, updateSore, updateSoreNewDay, removeSore, removeAllSores, setSelectedSore}

}