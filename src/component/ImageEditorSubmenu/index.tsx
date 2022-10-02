import { Dispatch, SetStateAction, useContext } from 'react';
import { DragAreaContext } from '../../context/DragAreaProvider';
import { EditModeContext } from '../../context/EditModeProvider';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { resizeImage } from '../../utils/imageUtils';
import { IImageSize } from '../ImageEditor';
import CropSubmenu from './CropSubmenu';

interface Props {
  setImage: Dispatch<SetStateAction<HTMLImageElement | null>>;
  setImageSize: Dispatch<SetStateAction<IImageSize>>;
}

const ImageEditorSubmenu = ({ setImage, setImageSize }: Props) => {
  const { previewLayer } = useContext(ImageLayerContext);
  const { resetDragArea } = useContext(DragAreaContext);

  const applyEditedImage = (editedImage: ImageData) => {
    if (!previewLayer?.current) return;
    const previewCanvas = previewLayer.current;
    const previewContext = previewCanvas.getContext('2d');

    previewCanvas.width = editedImage.width;
    previewCanvas.height = editedImage.height;
    previewContext?.putImageData(editedImage, 0, 0);
    resetDragArea();

    const image = new Image();
    image.src = previewCanvas.toDataURL('image/jpeg');

    image.onload = () => {
      setImage(image);
      setImageSize(resizeImage(image));
    };
  };

  const { editMode } = useContext(EditModeContext);
  return (
    <div className="py-6 mx-auto">
      {editMode === 'Crop' && (
        <CropSubmenu applyEditedImage={applyEditedImage} />
      )}
    </div>
  );
};

export default ImageEditorSubmenu;
