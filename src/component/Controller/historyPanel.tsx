import { useContext } from 'react';
import { ImageContextState } from '../../context/ImageContext';
import useImageDispatch from '../../hooks/useImageDispatch';

const HistoryPanel = () => {
  const { history, historyIdx } = useContext(ImageContextState);
  const { skip } = useImageDispatch();
  return (
    <ul className="">
      {history?.map((item, idx) => {
        return (
          <li
            key={idx}
            className={`px-4 py-1 hover:bg-slate-200 cursor-pointer text-xs first-letter:uppercase
            ${
              historyIdx !== null && historyIdx < idx
                ? 'text-gray-300'
                : 'text-black'
            }`}
            onClick={() => skip(idx)}
          >
            {item.type === 'load' ? `load` : null}
            {item.type === 'draw' ? `draw` : null}
            {item.type === 'crop' ? `crop` : null}
            {item.type === 'rotate' ? `rotate(${item.degree})` : null}
          </li>
        );
      })}
    </ul>
  );
};

export default HistoryPanel;
