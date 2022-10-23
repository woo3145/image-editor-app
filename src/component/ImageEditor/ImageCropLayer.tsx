import { useCallback, useContext, useEffect } from 'react';
import { DragAreaContext } from '../../context/DragAreaProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContextState } from '../../context/ImageContext';
import { resizeImage } from '../../utils/imageUtils';

const ImageCropLayer = () => {
  const { cropLayer } = useContext(ImageLayerContext);
  const { dragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);
  const { image, degree } = useContext(ImageContextState);

  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!image) return;
      const { width, height } = resizeImage(image, degree);
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgb(0,0,0,0.4)';
      context.fillRect(0, 0, width, height);
    },
    [image, degree]
  );
  const removeDragArea = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!dragArea) return;
      context.fillStyle = 'rgb(0,0,0,0)';
      context.clearRect(
        dragArea.x,
        dragArea.y,
        dragArea.width,
        dragArea.height
      );
    },
    [dragArea]
  );
  const drawCropArea = useCallback(() => {
    if (!cropLayer?.current || editMode !== 'Crop' || !dragArea) return;

    const canvas = cropLayer.current;
    const context = canvas.getContext('2d');

    if (!context) return;
    drawBackground(context);
    removeDragArea(context);
  }, [cropLayer, dragArea, editMode, drawBackground, removeDragArea]);

  // Crop Layer 생성
  useEffect(() => {
    if (!cropLayer?.current || !image || editMode !== 'Crop') return;
    const canvas = cropLayer.current;

    const { width, height } = resizeImage(image, degree);
    canvas.width = width;
    canvas.height = height;

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, width, height);
    };
  }, [image, cropLayer, editMode, degree]);

  useEffect(() => {
    drawCropArea();
  }, [drawCropArea]);

  if (editMode !== 'Crop') return null;

  return <canvas className="absolute top-0" ref={cropLayer} />;
};

export default ImageCropLayer;
