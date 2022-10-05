import { useContext } from 'react';
import { EditModeContext } from '../../context/EditModeProvider';
import CropSubmenu from './CropSubmenu';
import DrawSubmenu from './DrawSubmenu';

const ImageEditorSubmenu = () => {
  const { editMode } = useContext(EditModeContext);
  return (
    <div className="py-6 mx-auto">
      {editMode === 'Crop' && <CropSubmenu />}
      {editMode === 'Draw' && <DrawSubmenu />}
    </div>
  );
};

export default ImageEditorSubmenu;
