import { IoCropOutline, IoPencilOutline } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs';
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { EditModeType, isEditModeType } from '../App';
import ControllerItem from './ControllerItem';

interface Props {
  editMode: EditModeType;
  setEditMode: Dispatch<SetStateAction<EditModeType>>;
}

const Controller = ({ editMode, setEditMode }: Props) => {
  // Mode Switching
  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
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
