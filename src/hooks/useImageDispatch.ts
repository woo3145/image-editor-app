import { useCallback, useContext } from 'react';
import {
  ImageContextDispatch,
  ImageContextState,
} from '../context/ImageContext';

const useImageDispatch = () => {
  const { history, historyIdx } = useContext(ImageContextState);
  const { setHistory, setHistoryIdx, setRootImage } =
    useContext(ImageContextDispatch);

  const addHistory = useCallback(
    (
      image: string | HTMLImageElement,
      degree: number,
      type: HistoryNodeType
    ) => {
      if (!setHistory || !setHistoryIdx) return;
      if (!history || historyIdx === null) return;

      if (typeof image === 'string') {
        const imageEl = new Image();
        imageEl.src = image;

        imageEl.onload = () => {
          setHistory([
            ...history.slice(0, historyIdx + 1),
            { image: imageEl, degree, type },
          ]);
          setHistoryIdx(historyIdx + 1);
        };
      } else {
        setHistory([
          ...history.slice(0, historyIdx + 1),
          { image, degree, type },
        ]);
        setHistoryIdx(historyIdx + 1);
      }
    },
    [history, setHistory, historyIdx, setHistoryIdx]
  );

  const initImage = useCallback(
    (image: string | HTMLImageElement) => {
      if (!setRootImage || !setHistory || !setHistoryIdx) return;
      if (typeof image === 'string') {
        const imageEl = new Image();
        imageEl.src = image;

        imageEl.onload = () => {
          setRootImage(imageEl);
          setHistory([{ image: imageEl, degree: 0, type: 'load' }]);
          setHistoryIdx(0);
        };
      } else {
        setRootImage(image);
        setHistory([{ image, degree: 0, type: 'load' }]);
        setHistoryIdx(0);
      }
    },
    [setHistory, setHistoryIdx, setRootImage]
  );

  const undo = () => {
    if (!setHistoryIdx || historyIdx === null) return;
    if (historyIdx < 1) return;

    setHistoryIdx(historyIdx - 1);
  };
  const redo = () => {
    if (!setHistoryIdx || historyIdx === null || !history) return;
    if (historyIdx >= history.length - 1) return;

    setHistoryIdx(historyIdx + 1);
  };
  const skip = (idx: number) => {
    if (!setHistoryIdx || historyIdx === null || !history) return;
    if (0 <= idx && idx <= history.length - 1) {
      setHistoryIdx(idx);
    }
  };

  return {
    addHistory,
    initImage,
    undo,
    redo,
    skip,
  };
};

export default useImageDispatch;
