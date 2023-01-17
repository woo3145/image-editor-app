import { useContext } from 'react';
import ImageCropLayer from './ImageCropLayer';
import ImageDragLayer from './ImageDragLayer';
import ImageEditorSubmenu from './ImageEditorSubmenu';
import ImagePreviewLayer from './ImagePreviewLayer';
import ImageDrawLayer from './ImageDrawLayer';
import { ImageContextState } from '../../context/ImageContext';
import { EditModeContextState } from '../../context/EditModeContext';

const ImageEditor = () => {
  const { image } = useContext(ImageContextState);
  const { editMode } = useContext(EditModeContextState);

  return (
    <div className="w-full max-w-screen-lg pt-2">
      <ImageEditorSubmenu />
      {image ? (
        <div className="w-full flex items-center justify-center relative">
          <ImagePreviewLayer />
          {editMode === 'Crop' && <ImageCropLayer />}
          {editMode === 'Draw' && <ImageDrawLayer />}
          <ImageDragLayer />
        </div>
      ) : (
        <div
          className="flex items-center justify-center mx-auto text-2xl ring"
          style={{ width: 800, height: 500 }}
        >
          이미지를 선택해주세요.
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
