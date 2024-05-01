import React, { ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebaseConfig';
import { saveLogTime, saveData } from "../services/firestoreService";
import { DailyLog } from "../types";
import Button from "../components/Button";
import { InputCheckboxField, InputNumberField } from "../components/InputBox";




const DailyLogView: React.FC = () => {

// const [dailyLogs, setDailyLogs] = useState<DailyLog[]>();

//   async function fetchDailyLogs() {
//     try {
//       const dailyLogsLoaded: DailyLog[] = await loadData("dailyLogs");
//       setDailyLogs(dailyLogsLoaded);
//     } catch (e) {
//       alert(`Could not load daily log: ${e}`)
//     }
//   }

//   useEffect(() =>
//   (
//     await fetchDailyLogs
//   ),[]);

    const today = new Date();
    const [dailyLog, setDailyLog] = useState<DailyLog>(
            { 
            id: uuidv4(),
            date: today,
            activeSoreIDs: [],
            currentlySick: false,
            sugarUse: false,
            spicyFood: false,
            caffeineUse: 0,
            carbonatedDrinks: 0,
            alcoholicDrinks: 0,
            hoursOfSleep: 7,
            stressLevel: 5,
            notes: "" }
    );
    let navigate = useNavigate();

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;
    setDailyLog(prev => ({ ...prev, [name]: value }));
    }

    let handleFinishButtonClick = async() => {
        if (dailyLog) {
            try {
                await saveData("dailyLogs", dailyLog.id, dailyLog);
                await saveLogTime(today);
                navigate("/");
            } catch (e) {
                alert(`Could not save log. Error: ${e}`)
            }

        }
    }

return (
    <div className="daily-log-container">
        <div className="input-form max-w-md flex flex-col justify-around">

        <form>
            <h2>Diet</h2>

            <InputCheckboxField 
                    label="Did you have sugar, candy, cakes, or suargy drinks today?" 
                    forLabel="sugarUse" 
                    value={dailyLog.sugarUse} 
                    onChange={inputChangeHandler} />

           <InputCheckboxField 
                    label="Did you eat spicy food today?" 
                    forLabel="spicyFood" 
                    value={dailyLog.spicyFood} 
                    onChange={inputChangeHandler} />    

            <InputNumberField 
                    label="How many caffeinated drinks today?" 
                    forLabel="caffeineUse" 
                    options={[0,1,2,3,4,5,6,7,8,9,10]}
                    value={dailyLog.caffeineUse} 
                    onChange={inputChangeHandler} 
                />

            <InputNumberField label="Did how many alcoholic drinks today?" 
            forLabel="alcoholicDrinks" 
            options={[0,1,2,3,4,5,6,7,8,9,10]}
            value={dailyLog?.alcoholicDrinks}
            onChange={inputChangeHandler} />
            
            {/* Add other inputs as needed */}
            <h2> Health</h2>
            <InputCheckboxField 
                    label="Are you sick today?" 
                    forLabel="currentlySick" 
                    value={dailyLog.currentlySick} 
                    onChange={inputChangeHandler} />  

            <InputNumberField label="How many hours of sleep did you get?" 
            forLabel="hoursOfSleep" 
            options={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}
            value={dailyLog?.hoursOfSleep}
            onChange={inputChangeHandler} />

            <InputNumberField label="What is your stress level: 1 Low - 10 High?" 
            forLabel="streeLevel" 
            options={[0,1,2,3,4,5,6,7,8,9,10]}
            value={dailyLog?.stressLevel}
            onChange={inputChangeHandler} />

            <label htmlFor="notes" className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 text-left">Notes:</label>
                <input
                    type="text"
                    name="notes"
                    value={dailyLog?.notes}
                    onChange={inputChangeHandler}
                    className="w-full h-60"
                />
 
        </form>
        <div className="flex flex-row justify-around">
        <Button label="Finish" action={handleFinishButtonClick} />
        <Button label="Back" action={() => navigate("/")} />
        </div>
    </div>

    
    </div>
);

};

export default DailyLogView


