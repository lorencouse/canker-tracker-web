import { useState } from "react";
import { loadLogTime } from "../services/firestoreService";


export default function useDailyLogCheckeruseDailyLogChecker(defaultVal: boolean): [boolean, () => Promise<void>] {

const [dailyLogCompleted, setDailyLogCompleted] = useState<boolean>(defaultVal)

async function checkDailyLogUptoDate(): Promise<void>  {

  let lastLogTime: Date | null = null;

  // Load Last Log Time
  try {
    const lastLogTimeLoaded: Date | null = await loadLogTime(); // Assume loadLogTime might return null
    if (lastLogTimeLoaded === null) {
      setDailyLogCompleted(false);
      return 
    } else {
        lastLogTime = new Date(lastLogTimeLoaded);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Unable to load last log time: ${error.message}`);
    } else {
      alert("An unknown error occurred while loading log time.");
    }
    return;
  }

  // Check if Log up to date
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - lastLogTime.getTime(); // Use subtraction to calculate the difference
  const twentyThreeHrsToMs = 23 * 60 * 60 * 1000;

  if (timeDifference > twentyThreeHrsToMs) {
    setDailyLogCompleted(false);
  } else {
    setDailyLogCompleted(true);
  }
}

return [dailyLogCompleted, checkDailyLogUptoDate]


}


