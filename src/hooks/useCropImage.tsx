import { useCallback, useContext } from 'react';
import { DragAreaContext } from '../context/DragAreaProvider';
import { EditModeContext } from '../context/EditModeProvider';
import { ImageLayerContext } from '../context/ImageLayerProvider';
import useImageDispatch from './useImageDispatch';

const useCropImage = () => {
  const { dragArea, resetDragArea, isEmpty } = useContext(DragAreaContext);
  const { previewLayer, degree } = useContext(ImageLayerContext);
  const { setEditMode } = useContext(EditModeContext);
  const { addHistory } = useImageDispatch();

  const onClickApply = useCallback(() => {
    if (!previewLayer?.current || !dragArea || !resetDragArea || !setEditMode)
      return;
    if (isEmpty) {
      setEditMode('None');
      return;
    }
    const previewCanvas = previewLayer.current;
    const previewContext = previewCanvas.getContext('2d');

    const cropedImage = previewContext?.getImageData(
      dragArea.x,
      dragArea.y,
      dragArea.width,
      dragArea.height
    );

    if (!cropedImage) return;

    previewCanvas.width = cropedImage.width;
    previewCanvas.height = cropedImage.height;
    previewContext?.putImageData(cropedImage, 0, 0);

    resetDragArea();
    addHistory(previewCanvas.toDataURL('image/jpeg'), degree);
    setEditMode('None');
  }, [
    dragArea,
    isEmpty,
    resetDragArea,
    previewLayer,
    addHistory,
    setEditMode,
    degree,
  ]);

  const onClickCancel = useCallback(() => {
    if (!resetDragArea || !setEditMode) return;
    resetDragArea();
    setEditMode('None');
  }, [resetDragArea, setEditMode]);

  return {
    onClickApply,
    onClickCancel,
  };
};

export default useCropImage;
