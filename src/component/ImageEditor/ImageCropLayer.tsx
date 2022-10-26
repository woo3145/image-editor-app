import { useCallback, useContext, useEffect } from 'react';
import { DragAreaContextState } from '../../context/DragAreaContext';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';

const ImageCropLayer = () => {
  const { cropLayer } = useContext(ImageLayerContextState);
  const { dragArea } = useContext(DragAreaContextState);
  const { imageSize } = useContext(ImageContextState);

  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!imageSize) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
      context.fillStyle = 'rgb(0,0,0,0.4)';
      context.fillRect(0, 0, imageSize.width, imageSize.height);
    },
    [imageSize]
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
    if (!cropLayer?.current || !dragArea) return;

    const canvas = cropLayer.current;
    const context = canvas.getContext('2d');

    if (!context) return;
    drawBackground(context);
    removeDragArea(context);
  }, [cropLayer, dragArea, drawBackground, removeDragArea]);

  // Crop Layer 생성
  useEffect(() => {
    if (!cropLayer?.current || !imageSize) return;
    const canvas = cropLayer.current;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
    };
  }, [cropLayer, imageSize]);

  useEffect(() => {
    drawCropArea();
  }, [drawCropArea]);

  return <canvas className="absolute top-0" ref={cropLayer} />;
};

export default ImageCropLayer;
