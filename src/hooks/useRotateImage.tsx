import { useContext } from 'react';
import { ImageContextState } from '../context/ImageContext';
import {
  ImageLayerContextDispatch,
  ImageLayerContextState,
} from '../context/ImageLayerContext';
import useImageDispatch from './useImageDispatch';

const useRotateImage = () => {
  const { image } = useContext(ImageContextState);
  const { degree } = useContext(ImageLayerContextState);
  const { setDegree } = useContext(ImageLayerContextDispatch);
  const { addHistory } = useImageDispatch();

  const rotateRight = () => {
    if (!image) return;
    const changedDegree = degree === 270 ? 0 : degree + 90;
    setDegree(changedDegree);
    addHistory(image, changedDegree, 'rotate');
  };
  const rotateLeft = () => {
    if (!image) return;
    const changedDegree = degree === 0 ? 360 - 90 : degree - 90;
    setDegree(changedDegree);
    addHistory(image, changedDegree, 'rotate');
  };

  return { rotateRight, rotateLeft };
};

export default useRotateImage;
