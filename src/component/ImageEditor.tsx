import { useEffect, useState } from 'react';
import { resizeImage } from '../utils/imageUtils';
import ImageCropLayer from './ImageCropLayer';
import ImageDragLayer from './ImageDragLayer';
import ImagePreviewLayer from './ImagePreviewLayer';

interface Props {
  imageUrl: string;
}
export interface IImageSize {
  width: number;
  height: number;
}
const ImageEditor = ({ imageUrl }: Props) => {
  const [imageSize, setImageSize] = useState<IImageSize>({
    width: 0,
    height: 0,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setImage(image);
      setImageSize(resizeImage(image));
    };
  }, [imageUrl]);

  return (
    <div className="w-full max-w-screen-lg pt-8 ">
      {image ? (
        <div className="w-full flex items-center justify-center relative">
          <ImagePreviewLayer image={image} imageSize={imageSize} />
          <ImageCropLayer image={image} imageSize={imageSize} />
          <ImageDragLayer image={image} imageSize={imageSize} />
        </div>
      ) : (
        <div
          className="flex  items-center justify-center mx-auto text-2xl ring"
          style={{ width: 800, height: 500 }}
        >
          이미지를 선택해주세요.
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
