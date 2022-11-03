import { useCallback, useContext } from 'react';
import {
  DragAreaContextDispatch,
  DragAreaContextState,
} from '../context/DragAreaContext';
import { EditModeContextDispatch } from '../context/EditModeContext';
import { ImageContextDispatch } from '../context/ImageContext';
import { ImageLayerContextState } from '../context/ImageLayerContext';
import { loadImage } from '../utils/imageUtils';

const useCropImage = () => {
  const { dragArea, isEmpty } = useContext(DragAreaContextState);
  const { previewLayer } = useContext(ImageLayerContextState);

  const { setEditMode } = useContext(EditModeContextDispatch);
  const { resetDragArea } = useContext(DragAreaContextDispatch);
  const { addHistory } = useContext(ImageContextDispatch);

  const onClickApply = useCallback(async () => {
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
    const img = await loadImage(previewCanvas.toDataURL('image/jpeg'));
    addHistory(img, 0, 'crop');
    setEditMode('None');
  }, [dragArea, isEmpty, resetDragArea, previewLayer, addHistory, setEditMode]);

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
