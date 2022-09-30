import { MouseEvent, ReactNode } from 'react';
import { EditModeType } from '../context/EditModeProvider';
import TooltipIcon from './TooltipIcon';

interface Props {
  mode: EditModeType;
  selected: boolean;
  icon: ReactNode;
  onClickHandler: (e: MouseEvent<HTMLLIElement>) => void;
}

const ControllerItem = ({ mode, selected, icon, onClickHandler }: Props) => {
  return (
    <li
      id={mode}
      onClick={onClickHandler}
      className={`p-3 ${
        selected
          ? 'bg-blue-900 text-white'
          : 'hover:bg-blue-900 hover:text-white duration-200'
      } rounded-md cursor-pointer group`}
    >
      <TooltipIcon icon={icon} tooltip={mode} />
    </li>
  );
};

export default ControllerItem;
