import ChartHistory from '@/components/Charts/ChartHistory';
import ImagePoint from '@/components/imagePlot/ImagePoint';

const Home = () => {
  return (
    <div className="flex min-h-[60vh] flex-row flex-wrap items-center justify-center gap-8 text-center">
      <div className="col-span-1 h-[500px] w-[500px]">
        {' '}
        {/* Adjust size as needed */}
        <ImagePoint />
      </div>
      <div className="col-span-1">
        <ChartHistory />
      </div>
    </div>
  );
};

export default Home;
