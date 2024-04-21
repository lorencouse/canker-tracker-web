export interface CankerSore {
    id: string;
    lastUpdated: Date[];
    numberOfDays: number;
    zone: string;
    gums: boolean;
    soreSize: number[];
    painLevel: number[];
    xCoordinate?: number;
    yCoordinate?: number;
}

export interface DailyLog {
    date: Date
    activeSoreIDs: string[]
    currentlySick?: boolean
    sugarUse?: boolean
    spicyFood?: boolean
    caffineUse?: number
    carbonatedDrinks?: number
    alcoholicDrinks?: number
    hoursOfSleep?: number
    stressLevel?: number
    notes?: string
}

export interface ImageScale {
    scaleX: number
    scaleY: number
    xOffset: number
    yOffset: number
}