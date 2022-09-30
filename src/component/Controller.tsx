import { IoCropOutline, IoPencilOutline } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs';
import { MouseEvent, ReactNode, useContext } from 'react';
import ControllerItem from './ControllerItem';
import {
  EditModeContext,
  EditModeType,
  isEditModeType,
} from '../context/EditModeProvider';

const Controller = () => {
  const { editMode, setEditMode } = useContext(EditModeContext);
  // Mode Switching
  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (!setEditMode) return;
    const selectedMode = e.currentTarget.id;
    if (!isEditModeType(selectedMode)) return;
    setEditMode(selectedMode === editMode ? 'None' : selectedMode);
  };
  const controllerItems: { mode: EditModeType; icon: ReactNode }[] = [
    { mode: 'Crop', icon: <IoCropOutline className="text-2xl" /> },
    { mode: 'Draw', icon: <IoPencilOutline className="text-2xl" /> },
    { mode: 'Rotate', icon: <BsArrowRepeat className="text-2xl" /> },
  ];
  return (
    <ul className="w-full flex items-center justify-center gap-4">
      {controllerItems.map(({ mode, icon }, idx) => {
        return (
          <ControllerItem
            key={idx}
            mode={mode}
            onClickHandler={onClickHandler}
            selected={editMode === mode}
            icon={icon}
          />
        );
      })}
    </ul>
  );
};

export default Controller;
