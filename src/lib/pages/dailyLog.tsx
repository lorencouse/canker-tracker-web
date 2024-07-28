import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import NumberSelector from '@/components/dailyLog/numberSelector';
import ToggleYesNo from '@/components/dailyLog/toggleYesNo';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { saveLogTime, saveData } from '@/services/firestoreService';
import type { DailyLog } from '@/types';

const DailyLogView: React.FC = () => {
  const today = new Date();
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    id: uuidv4(),
    date: today,
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, checked } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    setDailyLog((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setDailyLog((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFinishButtonClick = async () => {
    if (dailyLog) {
      try {
        await saveData('dailyLogs', dailyLog.id, dailyLog);
        // await saveLogTime(today);
        navigate('/');
      } catch (e) {
        alert(`Could not save log. Error: ${e}`);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4">
      <div className="flex flex-col">
        <h1 className="mb-4 text-2xl font-bold">Daily Log</h1>

        <form>
          <div className="mb-5 rounded-lg border border-gray-300 p-4">
            <h2 className="mb-2 text-lg font-semibold">Diet</h2>
            <h3 className="mb-4 text-sm">In the last 24 hours ...</h3>
            <ToggleYesNo
              label="Have you eaten sugar or sweets?"
              id="sugarUse"
              checked={dailyLog.sugarUse}
              onCheckedChange={(checked) =>
                handleSwitchChange('sugarUse', checked)
              }
            />
            <ToggleYesNo
              label='Have you eaten "spicy food"?'
              id="spicyFood"
              checked={dailyLog.spicyFood}
              onCheckedChange={(checked) =>
                handleSwitchChange('spicyFood', checked)
              }
            />
            <NumberSelector
              title="Have you had caffeinated drinks?"
              arrayLength={10}
              name="caffeineUse"
              logValue={dailyLog.caffeineUse}
              inputChangeHandler={inputChangeHandler}
            />
            <NumberSelector
              title="Have you had any carbonated drinks?"
              arrayLength={10}
              name="carbonatedDrinks"
              logValue={dailyLog.carbonatedDrinks}
              inputChangeHandler={inputChangeHandler}
            />
            <NumberSelector
              title="Have you had alcoholic drinks?"
              arrayLength={10}
              name="alcoholicDrinks"
              logValue={dailyLog.alcoholicDrinks}
              inputChangeHandler={inputChangeHandler}
            />
          </div>

          <div className="mb-5 rounded-lg border border-gray-300 p-4">
            <h2 className="mb-2 text-lg font-semibold">Health</h2>
            <ToggleYesNo
              label="Are you currently sick?"
              id="currentlySick"
              checked={dailyLog.currentlySick}
              onCheckedChange={(checked) =>
                handleSwitchChange('currentlySick', checked)
              }
            />

            <NumberSelector
              title="How many hours of sleep did you get?"
              arrayLength={25}
              name="hoursOfSleep"
              logValue={dailyLog.hoursOfSleep}
              inputChangeHandler={inputChangeHandler}
            />
            <NumberSelector
              title="What is your stress level: 0 (Low) - 10 (High)?"
              arrayLength={11}
              name="stressLevel"
              logValue={dailyLog.stressLevel}
              inputChangeHandler={inputChangeHandler}
            />
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes:
            </label>
            <Textarea
              name="notes"
              value={dailyLog.notes}
              onChange={inputChangeHandler}
              className="mt-1 block w-full"
            />
          </div>
        </form>
        <div className="flex justify-end gap-x-4">
          {/* <Button onClick={() => navigate('/')}>Back</Button> */}
          <Button onClick={handleFinishButtonClick}>Finish</Button>
        </div>
      </div>
    </div>
  );
};

export default DailyLogView;
