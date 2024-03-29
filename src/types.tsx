export interface CankerSore {
    id: string;
    lastUpdated: [Date];
    numberOfDays: number;
    locationImage: string;
    soreSize: [number];
    painLevel: [number];
    xCoordinateZoomed?: number;
    yCoordinateZoomed?: number;
    xCoordinateScaled?: number;
    yCoordinateScaled?: number;
}

export interface DailyLog {
    date: Date
    activeSoresID: string[]
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
    viewName: string
    scaleX: number
    scaleY: number
    xOffset: number
    yOffset: number
}