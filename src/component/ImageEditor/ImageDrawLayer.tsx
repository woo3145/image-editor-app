import { useCallback, useContext, useEffect, useState } from 'react';
import { DrawContext } from '../../context/DrawProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';
import useImageHistory from '../../hooks/useImageHistory';

const ImageDrawLayer = () => {
  const { editMode } = useContext(EditModeContext);
  const { previewLayer, dragLayer, drawLayer } = useContext(ImageLayerContext);
  const { range, color, penType } = useContext(DrawContext);
  const { imageSize, setImage } = useContext(ImageContext);
  const { save } = useImageHistory();
  const [mousePoint, setMousePoint] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    if (!drawLayer?.current || !imageSize || editMode !== 'Draw') return;
    const canvas = drawLayer.current;
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
  }, [imageSize, drawLayer, editMode]);

  const initDraw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current) return;
      setIsPainting(true);

      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');

      if (!context) return;
      context.lineCap = 'round';
      context.lineWidth = range;
      context.strokeStyle = color;
      context.beginPath();
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();

      if (penType === 'Straight') {
        if (!drawLayer?.current) return;
        const drawCanvas = drawLayer.current;
        const drawContext = drawCanvas.getContext('2d');
        if (!drawContext) return;
        drawContext.clearRect(
          0,
          0,
          imageSize?.width || 0,
          imageSize?.height || 0
        );
      }
      setMousePoint({ x: e.offsetX, y: e.offsetY, w: 0, h: 0 });
    },
    [previewLayer, setMousePoint, drawLayer, penType, imageSize, color, range]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
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

      if (!context) return;

      if (e.buttons === 1) {
        context.lineCap = 'round';
        context.lineWidth = range;
        context.strokeStyle = color;
        setIsPainting(true);
        if (penType === 'Free') {
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
        } else if (penType === 'Straight') {
          context.clearRect(
            0,
            0,
            imageSize?.width || 0,
            imageSize?.height || 0
          );
          context.beginPath();
          context.moveTo(mousePoint.x, mousePoint.y);
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
          context.save();
          setMousePoint({ ...mousePoint, w: e.offsetX, h: e.offsetY });
        }
        return;
      }

      if (penType === 'Free') {
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
      }
    },
    [penType, previewLayer, drawLayer, mousePoint, imageSize, color, range]
  );

  const endDraw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current) return;
      setIsPainting(false);
      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      if (penType === 'Straight') {
        context.lineCap = 'round';
        context.lineWidth = range;
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(mousePoint.x, mousePoint.y);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }

      const imageEl = new Image();
      imageEl.src = canvas.toDataURL();
      save(imageEl);
      setImage(canvas.toDataURL('image/jpeg'));
    },
    [save, setImage, previewLayer, penType, mousePoint, color, range]
  );

  useEffect(() => {
    if (editMode !== 'Draw') return;
    const canvas = dragLayer?.current;
    if (!canvas) return;
    const onMouseLeaveHandler = (e: MouseEvent) => {
      if (!isPainting) return;
      endDraw(e);
    };
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', onMouseLeaveHandler);

    return () => {
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mousedown', initDraw);
      canvas.removeEventListener('mouseup', endDraw);
      canvas.removeEventListener('mouseleave', onMouseLeaveHandler);
    };
  }, [draw, dragLayer, initDraw, endDraw, editMode, isPainting]);

  if (editMode !== 'Draw') return null;

  return <canvas className="absolute top-0" ref={drawLayer} />;
};

export default ImageDrawLayer;
