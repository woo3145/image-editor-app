import { useCallback, useContext, useEffect, useState } from 'react';
import { DrawContextState } from '../../context/DrawContext';
import { EditModeContextState } from '../../context/EditModeContext';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';
import useImageDispatch from '../../hooks/useImageDispatch';
import { resizeImage } from '../../utils/imageUtils';

const ImageDrawLayer = () => {
  const { editMode } = useContext(EditModeContextState);
  const { previewLayer, dragLayer, drawLayer } = useContext(
    ImageLayerContextState
  );
  const { range, color, penType } = useContext(DrawContextState);
  const { image, degree } = useContext(ImageContextState);
  const { addHistory } = useImageDispatch();
  const [mousePoint, setMousePoint] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    if (!image || !drawLayer?.current || editMode !== 'Draw') return;
    const canvas = drawLayer.current;
    const { width, height } = resizeImage(image, degree);
    canvas.width = width;
    canvas.height = height;
  }, [drawLayer, editMode, degree, image]);

  const initDraw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current || !image || editMode !== 'Draw') return;
      setIsPainting(true);

      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');

      const { width, height } = resizeImage(image, degree);
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
        drawContext.clearRect(0, 0, width, height);
        setMousePoint({ x: e.offsetX, y: e.offsetY, w: 0, h: 0 });
      }
    },
    [
      previewLayer,
      setMousePoint,
      drawLayer,
      penType,
      color,
      range,
      image,
      degree,
      editMode,
    ]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
      if (!image || !isPainting || editMode !== 'Draw') return;
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

      const { width, height } = resizeImage(image, degree);
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
          context.clearRect(0, 0, width, height);
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
      image,
      color,
      range,
      degree,
      isPainting,
      editMode,
    ]
  );

  const endDraw = useCallback(
    (e: MouseEvent) => {
      if (isPainting === false || editMode !== 'Draw') return;
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
    [
      addHistory,
      previewLayer,
      penType,
      mousePoint,
      color,
      range,
      isPainting,
      editMode,
    ]
  );

  useEffect(() => {
    if (editMode !== 'Draw') return;
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
  }, [draw, dragLayer, initDraw, endDraw, editMode, isPainting]);

  if (editMode !== 'Draw') return null;

  return <canvas className="absolute top-0" ref={drawLayer} />;
};

export default ImageDrawLayer;
