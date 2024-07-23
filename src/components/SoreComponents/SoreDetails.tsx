import type React from 'react';

import { useUIContext } from '@/Context/UiContext';

function ListItem({ label, data }: { label: string; data: string | number }) {
  return (
    <li className="mb-2 text-left">
      <span className="item-label font-bold">{label}</span> {data}
    </li>
  );
}

const SoreDetails: React.FC = () => {
  const { selectedSore } = useUIContext();
  const getColor = (painLevel: number) => {
    const lightness = 100 - painLevel * 7;
    return `hsl(0, 100%, ${lightness}%)`;
  };

  return (
    <div className="sore-details">
      {selectedSore && (
        <div className="sore-details-container border-grey my-4 w-full rounded-lg border-2 border-solid">
          <h3 className="border-grey m-5 text-2xl font-bold">Sore Details</h3>
          <hr />
          <div className="flex flex-row">
            <ul className="m-5 w-3/4">
              <ListItem
                label="Began: "
                data={new Date(selectedSore.updated[0]).toLocaleDateString()}
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
              <ListItem
                label="Sore Size: "
                data={selectedSore.size.join(', ')}
              />
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
            <div className="flex flex-grow flex-col items-center justify-center p-5">
              <div
                className="sore-preview"
                style={{
                  width: selectedSore.size[selectedSore.size.length - 1] * 2,
                  height: selectedSore.size[selectedSore.size.length - 1] * 2,
                  backgroundColor: getColor(
                    selectedSore.pain[selectedSore.pain.length - 1]
                  ),
                  borderRadius: '50%',
                  boxShadow: '0 0 10px foreground',
                  border: '2px solid foreground',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SoreDetails, ListItem };
