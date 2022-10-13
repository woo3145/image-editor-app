import { useCallback, useContext, useEffect } from 'react';
import { DragAreaContext } from '../../context/DragAreaProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';
import { resizeImage } from '../../utils/imageUtils';

const ImageCropLayer = () => {
  const { cropLayer, degree } = useContext(ImageLayerContext);
  const { dragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);
  const { image } = useContext(ImageContext);

  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!image) return;
      const imageSize = resizeImage(image);
      const width = degree % 180 ? imageSize.height : imageSize.width;
      const height = degree % 180 ? imageSize.width : imageSize.height;
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

    const imageSize = resizeImage(image);
    const width = degree % 180 ? imageSize.height : imageSize.width;
    const height = degree % 180 ? imageSize.width : imageSize.height;
    canvas.width = width;
    canvas.height = height;

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
    };
  }, [image, cropLayer, editMode, degree]);

  useEffect(() => {
    drawCropArea();
  }, [drawCropArea]);

  if (editMode !== 'Crop') return null;

  return <canvas className="absolute top-0" ref={cropLayer} />;
};

export default ImageCropLayer;
