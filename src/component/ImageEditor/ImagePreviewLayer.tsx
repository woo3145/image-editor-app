import { useContext, useEffect } from 'react';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';

const ImagePreviewLayer = () => {
  const { previewLayer } = useContext(ImageLayerContext);
  const { image, imageSize } = useContext(ImageContext);

  useEffect(() => {
    if (!previewLayer?.current || !image || !imageSize) return;
    const canvas = previewLayer.current;
    const context = canvas.getContext('2d');

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    context?.drawImage(image, 0, 0, imageSize.width, imageSize.height);
  }, [image, imageSize, previewLayer]);

  return <canvas className="top-0" ref={previewLayer} />;
};

export default ImagePreviewLayer;
