import type React from 'react';

import { useUIContext } from '@/Context/UiContext';

function ListItem({ label, data }: { label: string; data: string | number }) {
  return (
    <li>
      <span className="item-label">{label}</span> {data}
    </li>
  );
}

const SoreDetails: React.FC = () => {
  const { selectedSore } = useUIContext();

  return (
    <div className="sore-details">
      {selectedSore && (
        <>
          <h3>Sore Details</h3>
          <ul className="rounded border-2 border-solid border-black">
            <ListItem
              label="Status: "
              data={selectedSore.active ? 'Active' : 'Healed'}
            />
            {/* <ListItem label="Started on: " data={selectedSore.lastUpdated[0].toLocaleDateString()} /> */}
            {selectedSore.lastUpdated.length > 1 && (
              <ListItem
                label="Last Updated: "
                data={selectedSore.lastUpdated
                  .map((date) => new Date(date).toLocaleDateString())
                  .join(', ')}
              />
            )}
            <ListItem
              label="Number of Days: "
              data={selectedSore.numberOfDays}
            />
            <ListItem
              label="Location: "
              data={`${selectedSore.zone} ${selectedSore.gums ? 'on Gums' : ''}`}
            />
            <ListItem
              label="Sore Size: "
              data={selectedSore.soreSize.join(', ')}
            />
            <ListItem
              label="Pain Level: "
              data={selectedSore.painLevel.join(', ')}
            />
          </ul>
        </>
      )}
    </div>
  );
};

export { SoreDetails, ListItem };
