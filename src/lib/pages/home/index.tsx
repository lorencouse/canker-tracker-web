import ChartHistory from '@/components/Charts/ChartHistory';
import ImagePoint from '@/components/imagePlot/ImagePoint';
import { SoreDetails } from '@/components/SoreComponents/SoreDetails';
import SoreSliders from '@/components/SoreComponents/SoreSliders';
import { UIProvider } from '@/Context/UiContext';

const Home = () => {
  return (
    <UIProvider>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-8 text-center">
        <div className="flex flex-col">
          <div className="h-[600px] w-[600px]">
            <ImagePoint />
          </div>
          <SoreSliders />
        </div>
        <div className="col-span-1">
          <SoreDetails />
          <ChartHistory />
        </div>
      </div>
    </UIProvider>
  );
};

export default Home;
