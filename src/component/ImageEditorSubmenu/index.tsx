import { useContext } from 'react';
import { EditModeContext } from '../../context/EditModeProvider';
import CropSubmenu from './CropSubmenu';

const ImageEditorSubmenu = () => {
  const { editMode } = useContext(EditModeContext);
  return (
    <div className="py-6 mx-auto">{editMode === 'Crop' && <CropSubmenu />}</div>
  );
};

export default ImageEditorSubmenu;
