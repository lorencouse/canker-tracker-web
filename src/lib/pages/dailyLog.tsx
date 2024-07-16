import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../../components/Button';
import {
  InputCheckboxField,
  InputNumberField,
} from '../../components/InputBox';
import { saveLogTime, saveData } from '../../services/firestoreService';
import type { DailyLog } from '../types';

const DailyLogView: React.FC = () => {
  const today = new Date();
  const [dailyLog, setDailyLog] = useState<DailyLog>({
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
    notes: '',
  });
  const navigate = useNavigate();

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const value =
      target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value;
    const { name } = target;
    setDailyLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinishButtonClick = async () => {
    if (dailyLog) {
      try {
        await saveData('dailyLogs', dailyLog.id, dailyLog);
        await saveLogTime(today);
        navigate('/');
      } catch (e) {
        alert(`Could not save log. Error: ${e}`);
      }
    }
  };

  return (
    <div className="daily-log-container m-auto max-w-lg">
      <div className="input-form flex flex-col">
        <h1> Daily Log</h1>

        <form>
          <div className="my-2 rounded-lg border-2 border-solid border-gray-500 p-5">
            <h2>Diet</h2>
            <h3>In the last 24 hours ...</h3>
            <InputCheckboxField
              label="Have you had sugar? (candy, cakes, or sweetened drinks)"
              forLabel="sugarUse"
              value={dailyLog.sugarUse}
              onChange={inputChangeHandler}
            />

            <InputCheckboxField
              label="Have you eaten spicy food?"
              forLabel="spicyFood"
              value={dailyLog.spicyFood}
              onChange={inputChangeHandler}
            />

            <InputNumberField
              label="Have you had caffeinated drinks?"
              forLabel="caffeineUse"
              options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              value={dailyLog.caffeineUse}
              onChange={inputChangeHandler}
            />

            <InputNumberField
              label="Have you had carbonated drinks?"
              forLabel="carbonatedDrinks"
              options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              value={dailyLog.carbonatedDrinks}
              onChange={inputChangeHandler}
            />

            <InputNumberField
              label="Have you had alcoholic drinks?"
              forLabel="alcoholicDrinks"
              options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              value={dailyLog?.alcoholicDrinks}
              onChange={inputChangeHandler}
            />
          </div>

          {/* Add other inputs as needed */}
          <div className="my-5 rounded-lg rounded-sm border-2 border-solid border-gray-500 p-5">
            <h2> Health</h2>
            <InputCheckboxField
              label="Are you currently sick?"
              forLabel="currentlySick"
              value={dailyLog.currentlySick}
              onChange={inputChangeHandler}
            />

            <InputNumberField
              label="How many hours of sleep did you get last night?"
              forLabel="hoursOfSleep"
              options={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23,
              ]}
              value={dailyLog?.hoursOfSleep}
              onChange={inputChangeHandler}
            />

            <InputNumberField
              label="What is your stress level: 1 (Low) - 10 (High)?"
              forLabel="streeLevel"
              options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              value={dailyLog?.stressLevel}
              onChange={inputChangeHandler}
            />

            <label
              htmlFor="notes"
              className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0"
            >
              Notes:
            </label>
            <input
              type="text"
              name="notes"
              value={dailyLog?.notes}
              onChange={inputChangeHandler}
              className="h-60 w-full"
            />
          </div>
        </form>
        <div className="flex flex-row justify-end">
          <Button label="Back" action={() => navigate('/')} />
          <Button label="Finish" action={handleFinishButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default DailyLogView;
