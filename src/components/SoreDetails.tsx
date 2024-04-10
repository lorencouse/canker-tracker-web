import React from "react";
import { CankerSore } from "../types";

interface SoreDetailsProps {
  sore: CankerSore;
}

const SoreDetails: React.FC<SoreDetailsProps> = ({ sore }) => {
    return (
        <div className="sore-details-container">
      <ul>

        <li>Last Updated: {sore.lastUpdated.join(', ')}</li>
        <li>Number of Days: {sore.numberOfDays}</li>
        <li>
          Location: {sore.locationImage} 
        </li>
        <li>Sore Size: {sore.soreSize.join(', ')}</li>
        <li>Pain Level: {sore.painLevel.join(', ')}</li>
        
      </ul>

        </div>
    )
}

export default SoreDetails