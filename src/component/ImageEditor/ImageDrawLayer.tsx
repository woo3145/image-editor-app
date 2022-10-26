import { useCallback, useContext, useEffect, useState } from 'react';
import { DrawContextState } from '../../context/DrawContext';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';
import useImageDispatch from '../../hooks/useImageDispatch';

const ImageDrawLayer = () => {
  const { previewLayer, dragLayer, drawLayer } = useContext(
    ImageLayerContextState
  );
  const { range, color, penType } = useContext(DrawContextState);
  const { imageSize } = useContext(ImageContextState);

  const { addHistory } = useImageDispatch();

  const [mousePoint, setMousePoint] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    if (!drawLayer?.current || !imageSize) return;
    const canvas = drawLayer.current;
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
  }, [drawLayer, imageSize]);

  const initDraw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current || !imageSize) return;
      setIsPainting(true);

      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');

      if (!context) return;
      context.lineCap = 'round';
      context.lineWidth = range;
      context.strokeStyle = color;

      // 점찍기
      context.beginPath();
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();

      if (penType === 'Straight') {
        if (!drawLayer?.current) return;
        const drawCanvas = drawLayer.current;
        const drawContext = drawCanvas.getContext('2d');
        if (!drawContext) return;
        drawContext.clearRect(0, 0, imageSize.width, imageSize.height);
        setMousePoint({ x: e.offsetX, y: e.offsetY, w: 0, h: 0 });
      }
    },
    [previewLayer, setMousePoint, drawLayer, penType, color, range, imageSize]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
      if (!imageSize || !isPainting) return;
      let canvas: null | HTMLCanvasElement = null;
      let context: CanvasRenderingContext2D | null = null;
      if (penType === 'Free') {
        if (!previewLayer?.current) return;
        canvas = previewLayer.current;
        context = canvas.getContext('2d');
      } else if (penType === 'Straight') {
        if (!drawLayer?.current) return;
        canvas = drawLayer.current;
        context = canvas.getContext('2d');
      }

      if (!context || !canvas) return;
      const canvasPosition = canvas.getBoundingClientRect();

      if (e.buttons === 1) {
        context.lineCap = 'round';
        context.lineWidth = range;
        context.strokeStyle = color;
        const x = e.clientX - canvasPosition.x;
        const y = e.clientY - canvasPosition.y;
        if (penType === 'Free') {
          if (
            canvasPosition.x < e.clientX ||
            canvasPosition.x + canvasPosition.width > e.clientX ||
            canvasPosition.y < e.clientY ||
            canvasPosition.y + canvasPosition.height > e.clientY
          ) {
            context.lineTo(x, y);
            context.stroke();
          }
        } else if (penType === 'Straight') {
          context.clearRect(0, 0, imageSize.width, imageSize.height);
          context.beginPath();
          context.moveTo(mousePoint.x, mousePoint.y);
          context.lineTo(x, y);
          context.stroke();
          setMousePoint({
            ...mousePoint,
            w: x,
            h: y,
          });
        }
        return;
      }
    },
    [
      penType,
      previewLayer,
      drawLayer,
      mousePoint,
      color,
      range,
      isPainting,
      imageSize,
    ]
  );

  const endDraw = useCallback(
    (e: MouseEvent) => {
      if (isPainting === false) return;
      console.log('End Draw');
      setIsPainting(false);
      if (!previewLayer?.current) return;
      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // 직선펜이면 Preview Layer에 그려진 선을 옮겨줌
      if (penType === 'Straight') {
        context.lineCap = 'round';
        context.lineWidth = range;
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(mousePoint.x, mousePoint.y);
        context.lineTo(
          mousePoint.w === 0 ? mousePoint.x : mousePoint.w,
          mousePoint.h === 0 ? mousePoint.y : mousePoint.h
        );
        context.stroke();
        setMousePoint({ x: 0, y: 0, w: 0, h: 0 });
      }

      const imageEl = new Image();
      imageEl.src = canvas.toDataURL();
      addHistory(canvas.toDataURL('image/jpeg'), 0);
    },
    [addHistory, previewLayer, penType, mousePoint, color, range, isPainting]
  );

  useEffect(() => {
    const canvas = dragLayer?.current;
    if (!canvas) return;
    canvas.addEventListener('mousedown', initDraw);
    document.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', endDraw);

    return () => {
      canvas.removeEventListener('mousedown', initDraw);
      document.removeEventListener('mousemove', draw);
      document.removeEventListener('mouseup', endDraw);
    };
  }, [draw, dragLayer, initDraw, endDraw, isPainting]);

  return <canvas className="absolute top-0" ref={drawLayer} />;
};

export default ImageDrawLayer;
