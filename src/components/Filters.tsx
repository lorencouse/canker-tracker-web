import React, { useState } from "react";
import { ZoneSelector } from "./ZoneSelector";


export interface FilterBy {
    zone?: string;
    active?: boolean;
    gums?: boolean;
    date?: Date;
    };

interface FilterByProps {
    
    filterBy?: {
        zone?: string;
        active?: boolean;
        gums?: boolean;
        date?: Date;
    };
    setFilterBy: (filter: any) => void; 
};

export const Filters: React.FC<FilterByProps> = ({ filterBy, setFilterBy }) => {
    const [zone, setZone] = useState<string>(filterBy?.zone || '');
    const [active, setActive] = useState<boolean>(filterBy?.active || false);
    const [gums, setGums] = useState<boolean>(filterBy?.gums || false);
    const [date, setDate] = useState<Date | undefined>(filterBy?.date);

    const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setZone(e.target.value);
        setFilterBy({ ...filterBy, zone: e.target.value });
    };

    const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActive(e.target.checked);
        setFilterBy({ ...filterBy, active: e.target.checked });
    };

    const handleGumsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGums(e.target.checked);
        setFilterBy({ ...filterBy, gums: e.target.checked });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.valueAsDate || undefined;
        setDate(newDate);
        setFilterBy({ ...filterBy, date: newDate });
    };

    return (
        <div className="sore-filters">
            <div><strong>Filter Sores By:</strong></div>
            <div>
                <label>
                    Active:
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={handleActiveChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Gums:
                    <input
                        type="checkbox"
                        checked={gums}
                        onChange={handleGumsChange}
                    />
                </label>
            </div>

            {/* <ZoneSelector onChange={handleZoneChange} zone={zone}/> */}

            <div>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date ? date.toISOString().split('T')[0] : ''}
                        onChange={handleDateChange}
                    />
                </label>
            </div>
        </div>
    );
};
