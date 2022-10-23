import { useContext } from 'react';
import { EditModeContextState } from '../../../context/EditModeContext';
import CropSubmenu from './CropSubmenu';
import DrawSubmenu from './DrawSubmenu';
import RotateSubmenu from './RotateSubmenu';

const ImageEditorSubmenu = () => {
  const { editMode } = useContext(EditModeContextState);

  return (
    <div className="py-6 mx-auto">
      {editMode === 'Crop' && <CropSubmenu />}
      {editMode === 'Draw' && <DrawSubmenu />}
      {editMode === 'Rotate' && <RotateSubmenu />}
    </div>
  );
};

export default ImageEditorSubmenu;
