import { BiUndo, BiRedo, BiHistory } from 'react-icons/bi';
import { MouseEvent, ReactNode, useContext, useMemo } from 'react';
import ControllerItem from './ControllerItem';
import useImageDispatch from '../../hooks/useImageDispatch';
import { ImageContextState } from '../../context/ImageContext';

const HistoryController = () => {
  const { redo, undo } = useImageDispatch();
  const { history, historyIdx } = useContext(ImageContextState);
  // Mode Switching
  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    const command = e.currentTarget.id;
    if (command === 'Undo') {
      undo();
    } else if (command === 'Redo') {
      redo();
    } else if (command === 'History') {
      console.log(history);
    }
  };
  const controllerItems: {
    text: string;
    icon: ReactNode;
    checkDisabled: () => boolean;
  }[] = useMemo(() => {
    return [
      {
        text: 'Undo',
        icon: <BiUndo className="text-2xl" />,
        checkDisabled: () => {
          if (historyIdx === null || !history) return true;
          return historyIdx < 1;
        },
      },
      {
        text: 'Redo',
        icon: <BiRedo className="text-2xl" />,
        checkDisabled: () => {
          if (historyIdx === null || !history) return true;
          return historyIdx >= history.length - 1;
        },
      },
      {
        text: 'History',
        icon: <BiHistory className="text-2xl" />,
        checkDisabled: () => {
          if (!history) return true;
          return false;
        },
      },
    ];
  }, [history, historyIdx]);

  return (
    <ul className="w-full flex items-center justify-center gap-4 px-4">
      {controllerItems.map(({ text, icon, checkDisabled }, idx) => {
        return (
          <ControllerItem
            key={idx}
            text={text}
            onClickHandler={onClickHandler}
            selected={false}
            disabled={checkDisabled()}
            icon={icon}
          />
        );
      })}
    </ul>
  );
};

export default HistoryController;