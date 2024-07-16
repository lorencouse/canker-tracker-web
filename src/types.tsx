export interface CankerSore {
  id: string;
  updated: Date[];
  zone: string;
  gums: boolean;
  size: number[];
  pain: number[];
  x?: number;
  y?: number;
}

export interface DailyLog {
  id: string;
  date: Date;
  activeSoreIDs: string[];
  currentlySick: boolean;
  sugarUse: boolean;
  spicyFood: boolean;
  caffeineUse: number;
  carbonatedDrinks: number;
  alcoholicDrinks: number;
  hoursOfSleep: number;
  stressLevel: number;
  notes: string;
}
