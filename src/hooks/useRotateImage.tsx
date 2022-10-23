import { useContext } from 'react';
import {
  ImageLayerContextDispatch,
  ImageLayerContextState,
} from '../context/ImageLayerContext';

const useRotateImage = () => {
  const { degree } = useContext(ImageLayerContextState);
  const { setDegree } = useContext(ImageLayerContextDispatch);

  const rotateRight = () => {
    setDegree(degree === 270 ? 0 : degree + 90);
  };
  const rotateLeft = () => {
    setDegree(degree === 0 ? 360 - 90 : degree - 90);
  };

  return { rotateRight, rotateLeft };
};

export default useRotateImage;
