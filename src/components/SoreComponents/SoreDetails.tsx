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
              label="Began: "
              data={selectedSore.updated[0].toLocaleDateString()}
            />
            {selectedSore.updated.length > 1 && (
              <ListItem
                label="Last Updated: "
                data={selectedSore.updated
                  .map((date) => new Date(date).toLocaleDateString())
                  .join(', ')}
              />
            )}
            <ListItem
              label="Location: "
              data={`${selectedSore.zone} ${selectedSore.gums ? 'on Gums' : ''}`}
            />
            <ListItem label="Sore Size: " data={selectedSore.size.join(', ')} />
            <ListItem
              label="Pain Level: "
              data={selectedSore.pain.join(', ')}
            />
            <ListItem
              label="X: "
              data={selectedSore.x.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            />
            <ListItem
              label="Y: "
              data={selectedSore.y.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            />
          </ul>
        </>
      )}
    </div>
  );
};

export { SoreDetails, ListItem };
