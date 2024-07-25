import { useState } from 'react';

import ChartHistory from '@/components/Charts/ChartHistory';
import ImagePoint from '@/components/imagePlot/ImagePoint';
import { SoreDetails } from '@/components/SoreComponents/SoreDetails';
import SoreSliders from '@/components/SoreComponents/SoreSliders';
import { UIProvider } from '@/Context/UiContext';

const Home = () => {
  const [mode, setMode] = useState<'add' | 'edit' | 'update' | 'view'>('view');

  return (
    <UIProvider>
      <div className="md:mx-10">
        <div className="flex min-h-screen w-full flex-col content-start md:flex-row">
          <div className="w-full p-4 md:w-1/2">
            <div className="relative aspect-square w-full">
              <ImagePoint mode={mode} setMode={setMode} />
            </div>
          </div>
          <div className="flex w-full flex-col justify-center self-start p-4 align-top md:w-1/2">
            {mode !== 'view' && <SoreSliders />}
            {mode === 'view' && <ChartHistory />}
            <SoreDetails />
          </div>
        </div>
      </div>
    </UIProvider>
  );
};

export default Home;
