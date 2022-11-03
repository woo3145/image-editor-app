import { useContext } from 'react';
import { ImageContextState } from '../context/ImageContext';
import useImageDispatch from './useImageDispatch';

const useRotateImage = () => {
  const { image, degree } = useContext(ImageContextState);
  const { addHistory } = useImageDispatch();

  const rotateRight = () => {
    if (!image) return;
    const changedDegree = degree === 270 ? 0 : degree + 90;
    addHistory(image, changedDegree, 'rotate');
  };
  const rotateLeft = () => {
    if (!image) return;
    const changedDegree = degree === 0 ? 360 - 90 : degree - 90;
    addHistory(image, changedDegree, 'rotate');
  };

  return { rotateRight, rotateLeft };
};

export default useRotateImage;
