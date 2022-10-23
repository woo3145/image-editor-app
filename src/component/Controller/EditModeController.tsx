import { IoCropOutline, IoPencilOutline } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs';
import { MouseEvent, ReactNode, useContext } from 'react';
import ControllerItem from './ControllerItem';
import { isEditModeType } from '../../utils/typeChecker';
import {
  EditModeContextDispatch,
  EditModeContextState,
} from '../../context/EditModeContext';

const EditModeController = () => {
  const { editMode } = useContext(EditModeContextState);
  const { setEditMode } = useContext(EditModeContextDispatch);

  // Mode Switching
  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (!setEditMode) return;
    const selectedMode = e.currentTarget.id;
    if (!isEditModeType(selectedMode)) return;
    setEditMode(selectedMode === editMode ? 'None' : selectedMode);
  };
  const controllerItems: { text: EditModeType; icon: ReactNode }[] = [
    { text: 'Crop', icon: <IoCropOutline className="text-2xl" /> },
    { text: 'Draw', icon: <IoPencilOutline className="text-2xl" /> },
    { text: 'Rotate', icon: <BsArrowRepeat className="text-2xl" /> },
  ];
  return (
    <ul className="w-full flex items-center justify-center gap-4 px-4">
      {controllerItems.map(({ text, icon }, idx) => {
        return (
          <ControllerItem
            key={idx}
            text={text}
            onClickHandler={onClickHandler}
            selected={editMode === text}
            icon={icon}
          />
        );
      })}
    </ul>
  );
};

export default EditModeController;
