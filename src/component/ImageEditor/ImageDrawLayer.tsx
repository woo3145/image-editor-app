import { useCallback, useContext, useEffect } from 'react';
import { DrawContext } from '../../context/DrawProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';

const ImageDrawLayer = () => {
  const { previewLayer, dragLayer } = useContext(ImageLayerContext);
  const { range, color } = useContext(DrawContext);
  const { editMode } = useContext(EditModeContext);

  const draw = useCallback(
    (e: MouseEvent) => {
      if (editMode && editMode !== 'Draw') return;
      if (!previewLayer?.current) return;
      const canvas = previewLayer.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      context.lineWidth = range;
      context.strokeStyle = color;
      if (e.buttons === 1) {
        context?.lineTo(e.offsetX, e.offsetY);
        context?.stroke();
        return;
      }
      context?.beginPath();
      context?.moveTo(e.offsetX, e.offsetY);
    },
    [previewLayer, range, color, editMode]
  );

  useEffect(() => {
    const dragCanvas = dragLayer?.current;
    if (!dragCanvas) return;
    dragCanvas.addEventListener('mousemove', draw);
    return () => {
      dragCanvas.removeEventListener('mousemove', draw);
    };
  }, [dragLayer, draw]);

  return null;
};

export default ImageDrawLayer;
