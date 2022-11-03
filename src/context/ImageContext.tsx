import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { resizeImage } from '../utils/imageUtils';

interface ContextState {
  image: HTMLImageElement | null;
  rootImage: HTMLImageElement | null;
  degree: number;
  imageSize: ImageSize;
  history: ImageHistoryNode[];
  historyIdx: number | null;
}

export const ImageContextState = createContext<ContextState>({
  image: null,
  rootImage: null,
  degree: 0,
  imageSize: {
    width: 0,
    height: 0,
  },
  history: [],
  historyIdx: null,
});

const dump = () => null;

interface ContextDispatch {
  addHistory:
    | ((
        image: HTMLImageElement,
        degree: number,
        type: HistoryNodeType
      ) => Promise<void>)
    | typeof dump;
  initImage: ((image: HTMLImageElement) => Promise<void>) | typeof dump;
  undo: (() => void) | typeof dump;
  redo: (() => void) | typeof dump;
  skip: ((idx: number) => void) | typeof dump;
  rotateLeft: (() => void) | typeof dump;
  rotateRight: (() => void) | typeof dump;
}
export const ImageContextDispatch = createContext<ContextDispatch>({
  addHistory: dump,
  initImage: dump,
  undo: dump,
  redo: dump,
  skip: dump,
  rotateLeft: dump,
  rotateRight: dump,
});

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [rootImage, setRootImage] = useState<HTMLImageElement | null>(null);

  const [history, setHistory] = useState<ImageHistoryNode[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);

  const curImage: ImageHistoryNode | null = useMemo(() => {
    return history[historyIdx] ? history[historyIdx] : null;
  }, [history, historyIdx]);

  const imageSize: ImageSize | null = useMemo(() => {
    if (curImage === null) return null;
    const { width, height } = resizeImage(curImage.image, curImage.degree);
    return { width, height };
  }, [curImage]);

  const imageContextStateValue = useMemo(() => {
    return {
      image: (curImage && curImage.image) || null,
      degree: (curImage && curImage.degree) || 0,
      imageSize: imageSize || { width: 0, height: 0 },
      rootImage,
      history: history,
      historyIdx: historyIdx,
    };
  }, [history, historyIdx, rootImage, curImage, imageSize]);

  const addHistory = useCallback(
    async (image: HTMLImageElement, degree: number, type: HistoryNodeType) => {
      image.alt = 'image';

      setHistory([
        ...history.slice(0, historyIdx + 1),
        { image: image, degree, type },
      ]);
      setHistoryIdx(historyIdx + 1);
    },
    [history, historyIdx]
  );

  const initImage = useCallback(
    async (image: HTMLImageElement) => {
      image.alt = 'image';
      setRootImage(image);
      setHistory([{ image: image, degree: 0, type: 'load' }]);
      setHistoryIdx(0);
    },
    [setHistory, setHistoryIdx, setRootImage]
  );

  const undo = useCallback(() => {
    if (historyIdx < 1) return;
    setHistoryIdx(historyIdx - 1);
  }, [historyIdx]);

  const redo = useCallback(() => {
    if (historyIdx >= history.length - 1) return;
    setHistoryIdx(historyIdx + 1);
  }, [historyIdx, history]);

  const skip = useCallback(
    (idx: number) => {
      if (0 <= idx && idx <= history.length - 1) {
        setHistoryIdx(idx);
      }
    },
    [history]
  );

  const rotateRight = useCallback(() => {
    if (!curImage) return;
    const changedDegree = curImage.degree === 270 ? 0 : curImage.degree + 90;
    addHistory(curImage.image, changedDegree, 'rotate');
  }, [addHistory, curImage]);

  const rotateLeft = useCallback(() => {
    if (!curImage) return;
    const changedDegree =
      curImage.degree === 0 ? 360 - 90 : curImage.degree - 90;
    addHistory(curImage.image, changedDegree, 'rotate');
  }, [addHistory, curImage]);

  const imageContextDispatchValue = useMemo(() => {
    return {
      addHistory,
      initImage,
      undo,
      redo,
      skip,
      rotateLeft,
      rotateRight,
    };
  }, [addHistory, initImage, undo, redo, skip, rotateLeft, rotateRight]);

  return (
    <ImageContextState.Provider value={imageContextStateValue}>
      <ImageContextDispatch.Provider value={imageContextDispatchValue}>
        {children}
      </ImageContextDispatch.Provider>
    </ImageContextState.Provider>
  );
};
