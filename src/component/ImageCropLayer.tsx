import { useCallback, useContext, useEffect } from 'react';
import { DragAreaContext } from '../context/DragAreaProvider';
import { EditModeContext } from '../context/EditModeProvider';
import { ImageLayerContext } from '../context/ImageLayerProvider';
import { IImageSize } from './ImageEditor';

interface Props {
  image: HTMLImageElement | null;
  imageSize: IImageSize;
}

const ImageCropLayer = ({ image, imageSize }: Props) => {
  const { cropLayer } = useContext(ImageLayerContext);
  const { dragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);

  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
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

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
    };
  }, [image, imageSize, cropLayer, editMode]);

  useEffect(() => {
    drawCropArea();
  }, [drawCropArea]);

  if (editMode !== 'Crop') return null;

  return <canvas className="absolute top-0" ref={cropLayer} />;
};

export default ImageCropLayer;
