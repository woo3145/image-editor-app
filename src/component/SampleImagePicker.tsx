import { useContext } from 'react';
import { SAMPLE_IMAGE1, SAMPLE_IMAGE2 } from '../constant';
import { ImageContextDispatch } from '../context/ImageContext';
import { loadImage } from '../utils/imageUtils';

const SampleImagePicker = () => {
  const { initImage } = useContext(ImageContextDispatch);

  const onClickInitImage = async (url: string) => {
    const img = await loadImage(url);
    initImage(img);
  };
  return (
    <div className="flex items-center gap-6 pt-8">
      <div
        onClick={() => onClickInitImage(SAMPLE_IMAGE1)}
        className="px-12 py-2 bg-blue-900 text-white rounded-md cursor-pointer"
      >
        이미지 1
      </div>
      <div
        onClick={() => onClickInitImage(SAMPLE_IMAGE2)}
        className="px-12 py-2 bg-purple-900 text-white rounded-md cursor-pointer"
      >
        이미지 2
      </div>
    </div>
  );
};

export default SampleImagePicker;
