import { useContext } from 'react';
import { ImageHistoryContext } from '../context/ImageProvider';

const useImageHistory = () => {
  const { history, historyIdx, setHistoryIdx } =
    useContext(ImageHistoryContext);

  const prev = () => {
    if (setHistoryIdx === null || historyIdx === null) return;
    if (historyIdx < 1) return;

    setHistoryIdx(historyIdx - 1);
  };
  const next = () => {
    if (setHistoryIdx === null || historyIdx === null || history === null)
      return;
    if (historyIdx >= history.length - 1) return;

    setHistoryIdx(historyIdx + 1);
  };

  return { prev, next, history, historyIdx };
};

export default useImageHistory;
