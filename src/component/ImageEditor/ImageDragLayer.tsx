import React, { useContext, useEffect } from 'react';
import { DragAreaContext } from '../../context/DragAreaProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';
import { resizeImage } from '../../utils/imageUtils';

const ImageDragLayer = () => {
  const { dragLayer, degree } = useContext(ImageLayerContext);
  const { setDragArea, resetDragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);
  const { image } = useContext(ImageContext);

  // Drag Layer 생성
  useEffect(() => {
    if (!dragLayer?.current || editMode === 'None' || !image) return;
    const canvas = dragLayer.current;

    const resizedImage = resizeImage(image, degree);
    canvas.width = resizedImage.width;
    canvas.height = resizedImage.height;

    // EditMode가 끝나거나 이미지가 변경되면 실행됨
    return () => {
      resetDragArea();
    };
  }, [image, dragLayer, editMode, resetDragArea, degree]);

  const onMouseDownHandler = ({
    buttons,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragLayer?.current || !image || editMode === 'None' || !setDragArea)
      return;
    if (buttons !== 1) return;

    resetDragArea();

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
      className={`absolute top-0 z-30  ${
        editMode === 'None' ? '' : 'cursor-crosshair'
      }`}
      ref={dragLayer}
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
    />
  );
};

export default ImageDragLayer;
