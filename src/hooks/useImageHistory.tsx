import { useContext } from 'react';
import { ImageContext, ImageHistoryContext } from '../context/ImageProvider';

const useImageHistory = () => {
  const { image, setImage } = useContext(ImageContext);
  const {
    history,
    setHistory,
    historyIdx,
    setHistoryIdx,
    historyLength,
    setHistoryLength,
  } = useContext(ImageHistoryContext);

  const initHistory = () => {
    if (!image) return;
    if (!history || !setHistory || !setHistoryIdx || !setHistoryLength) return;
    setHistoryIdx(0);
    setHistoryLength(1);
    setHistory([{ image }]);
  };
  const save = (img: HTMLImageElement) => {
    if (!image) return;
    if (
      history === null ||
      !setHistory ||
      !setHistoryIdx ||
      !setHistoryLength ||
      historyIdx === null ||
      historyLength === null
    )
      return;
    setHistoryIdx(historyIdx + 1);
    setHistoryLength(historyIdx + 2);
    setHistory([...history.slice(0, historyIdx + 1), { image: img }]);
    console.log('SAVE');
  };
  const prev = () => {
    if (
      history === null ||
      !setHistory ||
      !setHistoryIdx ||
      !setHistoryLength ||
      historyIdx === null ||
      historyLength === null
    )
      return;
    if (historyIdx < 1) return;

    setHistoryIdx(historyIdx - 1);
    setHistoryLength(historyLength);

    setImage(history[historyIdx - 1].image);
  };
  const next = () => {
    if (
      history === null ||
      !setHistory ||
      !setHistoryIdx ||
      !setHistoryLength ||
      historyIdx === null ||
      historyLength === null
    )
      return;
    if (historyIdx >= historyLength - 1) return;

    setHistoryIdx(historyIdx + 1);
    setHistoryLength(historyLength);

    setImage(history[historyIdx + 1].image);
  };

  return { initHistory, save, prev, next, history };
};

export default useImageHistory;
