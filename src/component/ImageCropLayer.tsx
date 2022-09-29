import { useCallback, useContext, useEffect } from 'react';
import { EditModeContext } from '../App';
import {
  DragAreaContext,
  ImageLayerContext,
} from '../context/ImageLayerProvider';
import { IImageSize } from './ImageEditor';

interface Props {
  image: HTMLImageElement | null;
  imageSize: IImageSize;
}

const ImageCropLayer = ({ image, imageSize }: Props) => {
  const { cropLayer } = useContext(ImageLayerContext);
  const { dragArea } = useContext(DragAreaContext);
  const { editMode } = useContext(EditModeContext);

  const drawCropArea = useCallback(() => {
    if (!cropLayer?.current || !image || editMode !== 'Crop' || !dragArea)
      return;

    const canvas = cropLayer.current;
    const context = canvas.getContext('2d');
    // 이전 크롭영역 제거 후 어두운 배경 재생성
    if (!context) return;
    context.clearRect(0, 0, imageSize.width, imageSize.height);
    context.fillStyle = 'rgb(0,0,0,0.4)';
    context.fillRect(0, 0, imageSize.width, imageSize.height);

    // 크롭 영역만 어두운 배경제거
    context.fillStyle = 'rgb(0,0,0,0)';
    context.clearRect(dragArea.x, dragArea.y, dragArea.width, dragArea.height);
  }, [cropLayer, dragArea, image, editMode, imageSize]);

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
