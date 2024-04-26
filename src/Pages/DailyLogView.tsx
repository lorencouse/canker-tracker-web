import React, { ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig';
import { saveData } from "../services/firestoreService";
import { DailyLog } from "../types";


const DailyLogView: React.FC = () => {

    const today = new Date();
    const [dailyLog, setDailyLog] = useState<DailyLog>(
            { 
            id: uuidv4(),
            date: today,
            activeSoreIDs: [],
            currentlySick: false,
            sugarUse: false,
            spicyFood: false,
            caffineUse: 0,
            carbonatedDrinks: 0,
            alcoholicDrinks: 0,
            hoursOfSleep: 7,
            stressLevel: 5,
            notes: "" }
    );
    let navigate = useNavigate();

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, type, value, checked} = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        setDailyLog(prev => ({ ...prev, [name]: updatedValue }));
    }

    let handleFinishButtonClick = async() => {
        if (dailyLog) {
            try {
                await saveData("dailyLogs", dailyLog.id, dailyLog)
                navigate("/");
            } catch (e) {
                alert(`Could not save log. Error: ${e}`)
            }

        }
    }



return (
    <div className="daily-log-container">
        <form>
            <h2>Diet</h2>
            <label>Did you eat sugar today?
                <input
                    type="checkbox"
                    name="sugarUse"
                    checked={dailyLog?.sugarUse}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Did you eat spicy food today?
                <input
                    type="checkbox"
                    name="spicyFood"
                    checked={dailyLog?.spicyFood}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Did how many caffinated drinks today?
                <input
                    type="number"
                    name="caffineUse"
                    min={1}
                    max={10}
                    value={dailyLog?.caffineUse}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Did how many carbonated drinks today?
                <input
                    type="number"
                    name="carbonatedDrinks"
                    min={1}
                    max={10}
                    value={dailyLog?.carbonatedDrinks}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Did how many alcoholic drinks today?
                <input
                    type="number"
                    name="alcoholicDrinks"
                    min={1}
                    max={10}
                    value={dailyLog?.alcoholicDrinks}
                    onChange={inputChangeHandler}
                />
            </label>
            
            {/* Add other inputs as needed */}
            <h2> Health</h2>
            <label>Are you sick?
                <input
                    type="checkbox"
                    name="currentlySick"
                    checked={dailyLog?.currentlySick}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Did how many hours of sleep did you get?
                <input
                    type="number"
                    name="hoursOfSleep"
                    min={0}
                    max={22}
                    value={dailyLog?.hoursOfSleep}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>What is your stress level: 1 Low - 10 High?
                <input
                    type="number"
                    name="stressLevel"
                    min={1}
                    max={10}
                    value={dailyLog?.stressLevel}
                    onChange={inputChangeHandler}
                />
            </label>
            <label>Notes:
                <input
                    type="text"
                    name="notes"
                    value={dailyLog?.notes}
                    onChange={inputChangeHandler}
                />
            </label>
        </form>
        
        <button onClick={handleFinishButtonClick}>Finish</button>
        <button onClick={() => navigate("/")}>Back</button>
    </div>
);

};

export default DailyLogView


