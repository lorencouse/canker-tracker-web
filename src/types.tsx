export interface CankerSore {
  id: string;
//   active: boolean;
  lastUpdated: Date[];
//   numberOfDays: number;
  zone: string;
  gums: boolean;
  soreSize: number[];
  painLevel: number[];
  xCoordinate?: number;
  yCoordinate?: number;
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
