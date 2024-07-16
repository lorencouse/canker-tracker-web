import { UIProvider } from '../../Context/UiContext';

import SoreButtons from './SoreButtons';
import { SoreDetails } from './SoreDetails';
import SoreDiagram from './SoreDiagram';
import SoreSliders from './SoreSliders';

const MouthOverview: React.FC = () => {
  return (
    <UIProvider>
      <div className="mouth-overview mx-auto flex flex-row flex-wrap justify-between sm:justify-around">
        <div className="sore-diagram lg:1/2 mx-auto flex">
          <SoreDiagram />
        </div>
        <div className="lg:1/2 mx-auto max-w-md grow">
          <div className="sore-buttons flex flex-col">
            <SoreButtons />
            <SoreSliders />
          </div>

          <div className="sore-details-container max-w2xl mx-2 flex flex-col">
            <SoreDetails />
          </div>
        </div>
      </div>
    </UIProvider>
  );
};

export default MouthOverview;
