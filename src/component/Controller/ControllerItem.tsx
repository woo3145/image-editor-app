import { MouseEvent, ReactNode } from 'react';
import TooltipIcon from '../atom/TooltipIcon';

interface Props {
  text: string;
  selected: boolean;
  disabled?: boolean;
  icon: ReactNode;
  onClickHandler: (e: MouseEvent<HTMLLIElement>) => void;
}

const ControllerItem = ({
  text,
  selected,
  disabled,
  icon,
  onClickHandler,
}: Props) => {
  return (
    <li
      id={text}
      onClick={onClickHandler}
      className={`p-3 ${!disabled && selected && 'bg-blue-900 text-white'} ${
        !selected &&
        !disabled &&
        'hover:bg-blue-900 hover:text-white duration-200'
      } ${disabled && 'text-gray-400'} rounded-md cursor-pointer group`}
    >
      <TooltipIcon icon={icon} tooltip={text} />
    </li>
  );
};

export default ControllerItem;
