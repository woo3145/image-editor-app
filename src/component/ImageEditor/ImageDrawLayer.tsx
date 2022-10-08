import { useCallback, useContext, useEffect } from 'react';
import { DrawContext } from '../../context/DrawProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';

const ImageDrawLayer = () => {
  const { previewLayer, dragLayer, drawLayer } = useContext(ImageLayerContext);
  const { range, color, penType } = useContext(DrawContext);

  const initDraw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current) return;

      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');

      if (!context) return;
      context.save();
      context.lineCap = 'round';
      context.lineWidth = range;
      context.strokeStyle = color;
      context.beginPath();
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    },
    [color, range, previewLayer]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
      if (!previewLayer?.current) return;

      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      if (e.buttons === 1) {
        if (penType === 'Free') {
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
        }
        return;
      }
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    },
    [penType, previewLayer]
  );

  useEffect(() => {
    const canvas = dragLayer?.current;
    if (!canvas) return;
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mousedown', initDraw);
    };
  }, [draw, dragLayer, initDraw]);

  return <canvas className="absolute top-0" ref={drawLayer} />;
};

export default ImageDrawLayer;
