import { useContext, useEffect } from 'react';
import { ImageLayerContext } from '../context/ImageLayerProvider';
import { IImageSize } from './ImageEditor';

interface Props {
  image: HTMLImageElement | null;
  imageSize: IImageSize;
}

const ImageDragLayer = ({ image, imageSize }: Props) => {
  const { dragLayer } = useContext(ImageLayerContext);

  useEffect(() => {
    if (!dragLayer?.current || !image) return;
    const canvas = dragLayer.current;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
  }, [image, imageSize, dragLayer]);
  return <canvas className="absolute top-0" ref={dragLayer} />;
};

export default ImageDragLayer;
