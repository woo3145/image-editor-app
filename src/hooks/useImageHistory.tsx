import { useContext } from 'react';
import { ImageHistoryContext } from '../context/ImageProvider';

const useImageHistory = () => {
  const { history, historyIdx, setHistoryIdx, historyLength } =
    useContext(ImageHistoryContext);

  const prev = () => {
    if (!setHistoryIdx || historyIdx === null) return;
    if (historyIdx < 1) return;

    setHistoryIdx(historyIdx - 1);
  };
  const next = () => {
    if (!setHistoryIdx || historyIdx === null || historyLength === null) return;
    if (historyIdx >= historyLength - 1) return;

    setHistoryIdx(historyIdx + 1);
  };

  return { prev, next, history };
};

export default useImageHistory;
