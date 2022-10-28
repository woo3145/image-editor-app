import { BiUndo, BiRedo, BiHistory } from 'react-icons/bi';
import { MouseEvent, ReactNode, useContext, useMemo, useState } from 'react';
import ControllerItem from './ControllerItem';
import useImageDispatch from '../../hooks/useImageDispatch';
import { ImageContextState } from '../../context/ImageContext';
import HistoryPanel from './historyPanel';

const HistoryController = () => {
  const { redo, undo } = useImageDispatch();
  const { history, historyIdx } = useContext(ImageContextState);

  const [panelVisible, setPanelVisible] = useState(false);

  // Mode Switching
  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    const command = e.currentTarget.id;
    if (command === 'Undo') {
      undo();
    } else if (command === 'Redo') {
      redo();
    } else if (command === 'History') {
      setPanelVisible(!panelVisible);
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
    <ul className="w-full flex items-center justify-center gap-4 px-4 relative">
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
      {panelVisible && (
        <div className="absolute top-14 right-0 z-40 w-52 h-40 overflow-y-scroll bg-white border">
          <HistoryPanel />
        </div>
      )}
    </ul>
  );
};

export default HistoryController;
