import { useContext, useEffect } from 'react';
import ImageCropLayer from './ImageCropLayer';
import ImageDragLayer from './ImageDragLayer';
import ImageEditorSubmenu from './ImageEditorSubmenu';
import ImagePreviewLayer from './ImagePreviewLayer';
import { ImageContext } from '../../context/ImageProvider';
import ImageDrawLayer from './ImageDrawLayer';

interface Props {
  imageUrl: string;
}
const ImageEditor = ({ imageUrl }: Props) => {
  const { image, initImage } = useContext(ImageContext);

  useEffect(() => {
    initImage(imageUrl);
  }, [imageUrl, initImage]);

  return (
    <div className="w-full max-w-screen-lg pt-2 ">
      <ImageEditorSubmenu />
      {image ? (
        <div className="w-full flex items-center justify-center relative">
          <ImagePreviewLayer />
          <ImageCropLayer />
          <ImageDrawLayer />
          <ImageDragLayer />
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
