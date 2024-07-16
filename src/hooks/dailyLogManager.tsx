import { loadLogTime } from '../services/firestoreService';

export const checkDailyLogStatus = async (): Promise<boolean> => {
  let lastLogTime: Date | null = null;

  // Load Last Log Time
  try {
    const lastLogTimeLoaded: Date | null = await loadLogTime();
    if (lastLogTimeLoaded === null) {
      return false;
    }
    lastLogTime = new Date(lastLogTimeLoaded);
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Unable to load last log time: ${error.message}`);
    } else {
      alert('An unknown error occurred while loading log time.');
    }
    return false;
  }

  // Check if Log up to date
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - lastLogTime.getTime();
  const twentyThreeHrsToMs = 23 * 60 * 60 * 1000;

  return timeDifference <= twentyThreeHrsToMs;
};
