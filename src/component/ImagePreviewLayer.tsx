import { useContext, useEffect } from 'react';
import { ImageLayerContext } from '../context/ImageLayerProvider';
import { IImageSize } from './ImageEditor';

interface Props {
  image: HTMLImageElement | null;
  imageSize: IImageSize;
}

const ImagePreviewLayer = ({ image, imageSize }: Props) => {
  const { previewLayer } = useContext(ImageLayerContext);

  useEffect(() => {
    if (!previewLayer?.current || !image) return;
    const canvas = previewLayer.current;
    const context = canvas.getContext('2d');

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    context?.drawImage(image, 0, 0, imageSize.width, imageSize.height);
  }, [image, imageSize, previewLayer]);
  return <canvas className="top-0" ref={previewLayer} />;
};

export default ImagePreviewLayer;
