import React from "react";
import { CankerSore } from "../../types";

interface SoreDetailsProps {
  sore: CankerSore;
  onDelete: () => void;
}

const SoreDetails: React.FC<SoreDetailsProps> = ({ sore, onDelete }) => {
    return (
        <div className="sore-details-container">
      <ul>
        <li>{sore.active ? "Active" : "Healed"}</li>
        <li>Last Updated: {sore.lastUpdated.join(', ')}</li>
        <li>Number of Days: {sore.numberOfDays}</li>
        <li>Location: {sore.zone} {`${sore.gums ? "on Gums" : ""}`}</li>
        <li>Sore Size: {sore.soreSize.join(', ')}</li>
        <li>Pain Level: {sore.painLevel.join(', ')}</li>
        <li>Location: {sore.xCoordinate} {sore.yCoordinate}</li>
        
      </ul>
      <button onClick={onDelete}>X</button>

        </div>
    )
}

export default SoreDetails