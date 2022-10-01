import React, { useContext, useEffect } from 'react';
import { EditModeContext } from '../context/EditModeProvider';
import {
  DragAreaContext,
  ImageLayerContext,
} from '../context/ImageLayerProvider';
import { IImageSize } from './ImageEditor';

interface Props {
  image: HTMLImageElement | null;
  imageSize: IImageSize;
}

const ImageDragLayer = ({ image, imageSize }: Props) => {
  const { dragLayer } = useContext(ImageLayerContext);
  const { setDragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);

  // Drag Layer 생성
  useEffect(() => {
    if (!dragLayer?.current || editMode === 'None') return;
    const canvas = dragLayer.current;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    // EditMode가 끝나거나 이미지가 변경되면 실행됨
    return () => {
      if (setDragArea) setDragArea({ x: 0, y: 0, width: 0, height: 0 });
    };
  }, [imageSize, image, dragLayer, editMode, setDragArea]);

  const onMouseDownHandler = ({
    buttons,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragLayer?.current || !image || editMode === 'None' || !setDragArea)
      return;
    if (buttons !== 1) return;

    setDragArea({ x: 0, y: 0, width: 0, height: 0 });

    const canvas = dragLayer.current;
    const canvasPosition = canvas.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    setDragArea({ x, y, width: 0, height: 0 });
  };

  const onMouseMoveHandler = ({
    buttons,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragLayer?.current || !image || editMode === 'None' || !setDragArea)
      return;
    if (buttons !== 1) return;

    const canvas = dragLayer.current;
    const canvasPosition = canvas.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    setDragArea((area) => ({
      ...area,
      width: x - area.x,
      height: y - area.y,
    }));
  };

  return (
    <canvas
      className={`absolute top-0 z-10  ${
        editMode === 'None' ? '' : 'cursor-crosshair'
      }`}
      ref={dragLayer}
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
    />
  );
};

export default ImageDragLayer;
