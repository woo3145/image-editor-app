import { useContext } from 'react';
import { ImageLayerContext } from '../context/ImageLayerProvider';

const useRotateImage = () => {
  const { degree, setDegree } = useContext(ImageLayerContext);
  const rotateRight = () => {
    setDegree(degree === 270 ? 0 : degree + 90);
  };
  const rotateLeft = () => {
    setDegree(degree === 0 ? 360 - 90 : degree - 90);
  };

  return { rotateRight, rotateLeft };
};

export default useRotateImage;
