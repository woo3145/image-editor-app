import useImageDispatch from '../hooks/useImageDispatch';

const SAMPLE_IMAGE1 = '/alvan-nee-lvFlpqEvuRM-unsplash.jpg';
const SAMPLE_IMAGE2 = '/lachlan-gowen-cWwqwN2uTo4-unsplash.jpg';

const SampleImagePicker = () => {
  const { initImage } = useImageDispatch();
  return (
    <div className="flex items-center gap-6 pt-8">
      <div
        onClick={() => initImage(SAMPLE_IMAGE1)}
        className="px-12 py-2 bg-blue-900 text-white rounded-md cursor-pointer"
      >
        이미지 1
      </div>
      <div
        onClick={() => initImage(SAMPLE_IMAGE2)}
        className="px-12 py-2 bg-purple-900 text-white rounded-md cursor-pointer"
      >
        이미지 2
      </div>
    </div>
  );
};

export default SampleImagePicker;
