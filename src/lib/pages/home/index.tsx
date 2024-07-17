import ChartDots from '@/components/Charts/ChartDots';
import ChartHistory from '@/components/Charts/ChartHistory';
import ImagePoint from '@/components/imagePlot/ImagePoint';
import { SoreDetails } from '@/components/SoreComponents/SoreDetails';
import SoreSliders from '@/components/SoreComponents/SoreSliders';
import { UIProvider } from '@/Context/UiContext';

const Home = () => {
  return (
    <UIProvider>
      <div className="flex min-h-[60vh] flex-row flex-wrap items-center justify-center gap-8 text-center">
        <div className="col-span-1 h-[600px] w-[600px]">
          <ImagePoint />
        </div>
        <div className="col-span-1">
          <SoreSliders />
          <SoreDetails />
          <ChartHistory />
          <ChartDots />
        </div>
      </div>
    </UIProvider>
  );
};

export default Home;
