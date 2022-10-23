import React, { useContext, useEffect } from 'react';
import { DragAreaContextDispatch } from '../../context/DragAreaContext';
import { EditModeContextState } from '../../context/EditModeContext';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';
import { resizeImage } from '../../utils/imageUtils';

const ImageDragLayer = () => {
  const { dragLayer } = useContext(ImageLayerContextState);
  const { setDragArea, resetDragArea } = useContext(DragAreaContextDispatch);
  const { editMode } = useContext(EditModeContextState);
  const { image, degree } = useContext(ImageContextState);

  // Drag Layer 생성
  useEffect(() => {
    if (!dragLayer?.current || editMode === 'None' || !image) return;
    const canvas = dragLayer.current;
    const { width, height } = resizeImage(image, degree);
    canvas.width = width;
    canvas.height = height;

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
