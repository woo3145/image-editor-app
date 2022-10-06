import React, { useContext, useEffect, useState } from 'react';
import { DrawContext } from '../../context/DrawProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';

const ImageDrawLayer = () => {
  const { drawLayer } = useContext(ImageLayerContext);
  const { range, color, penType } = useContext(DrawContext);
  const { imageSize } = useContext(ImageContext);
  const { editMode } = useContext(EditModeContext);

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );

  // Draw Layer 생성
  useEffect(() => {
    if (!drawLayer?.current || editMode !== 'Draw' || !imageSize) return;
    const canvas = drawLayer.current;
    const context = canvas.getContext('2d');
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    setCanvas(canvas);
    setCanvasCtx(context);

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
    };
  }, [imageSize, drawLayer, editMode]);

  const onMouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasCtx || !canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();
    const x = e.clientX - canvasPosition.x;
    const y = e.clientY - canvasPosition.y;

    canvasCtx.lineCap = 'round';
    canvasCtx.lineWidth = range;
    canvasCtx.strokeStyle = color;
    canvasCtx.beginPath();
    if (penType === 'Pen') {
      canvasCtx.lineTo(x, y);
      canvasCtx.stroke();
    } else {
      canvasCtx.clearRect(x, y, range, range);
    }
  };
  const onMouseUpHander = () => {
    if (!canvasCtx) return;
    canvasCtx.closePath();
  };
  const onMouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasCtx || !canvas) return;
    const canvasPosition = canvas.getBoundingClientRect();

    const x = e.clientX - canvasPosition.x;
    const y = e.clientY - canvasPosition.y;
    if (e.buttons === 1) {
      if (penType === 'Pen') {
        canvasCtx.lineTo(x, y);
        canvasCtx.stroke();
      } else {
        canvasCtx.clearRect(x, y, range, range);
      }
      return;
    }
    canvasCtx.moveTo(x, y);
  };
  return (
    <canvas
      className="absolute top-0 z-40"
      ref={drawLayer}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHander}
      onMouseMove={onMouseMoveHandler}
    />
  );
};

export default ImageDrawLayer;
