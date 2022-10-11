import { useContext } from 'react';
import { EditModeContext } from '../../context/EditModeProvider';
import useImageHistory from '../../hooks/useImageHistory';
import CropSubmenu from './CropSubmenu';
import DrawSubmenu from './DrawSubmenu';
import RotateSubmenu from './RotateSubmenu';

const ImageEditorSubmenu = () => {
  const { editMode } = useContext(EditModeContext);
  const { prev, next, history } = useImageHistory();

  return (
    <div className="py-6 mx-auto">
      {editMode === 'Crop' && <CropSubmenu />}
      {editMode === 'Draw' && <DrawSubmenu />}
      {editMode === 'Rotate' && <RotateSubmenu />}
      <div onClick={prev} className="cursor-pointer">
        이전
      </div>
      <div onClick={next} className="cursor-pointer">
        이후
      </div>
      <div onClick={() => console.log(history)} className="cursor-pointer">
        히스토리
      </div>
    </div>
  );
};

export default ImageEditorSubmenu;
