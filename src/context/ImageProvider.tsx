import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

export interface IImageSize {
  width: number;
  height: number;
}
interface IImageHistory {
  image: HTMLImageElement;
}
interface IImageContext {
  image: HTMLImageElement | null;
  setImage: (image: string | HTMLImageElement) => void;
  initImage: (image: string | HTMLImageElement) => void;
}
interface IImageHistoryContext {
  historyIdx: number | null;
  setHistoryIdx: Dispatch<React.SetStateAction<number>> | null;
  historyLength: number | null;
  setHistoryLength: Dispatch<React.SetStateAction<number>> | null;
  history: IImageHistory[] | null;
  setHistory: Dispatch<React.SetStateAction<IImageHistory[]>> | null;
}

export const ImageContext = createContext<IImageContext>({
  image: null,
  setImage: () => {},
  initImage: () => {},
});
export const ImageHistoryContext = createContext<IImageHistoryContext>({
  historyIdx: null,
  setHistoryIdx: null,
  historyLength: null,
  setHistoryLength: null,
  history: null,
  setHistory: null,
});

interface Props {
  children: ReactNode;
}

const ImageProvider = ({ children }: Props) => {
  const [image, _setImage] = useState<HTMLImageElement | null>(null);

  const [history, setHistory] = useState<IImageHistory[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [historyLength, setHistoryLength] = useState<number>(0);

  const setImage = useCallback(
    (image: string | HTMLImageElement) => {
      if (typeof image === 'string') {
        const imageEl = new Image();
        imageEl.src = image;

        imageEl.onload = () => {
          _setImage(imageEl);
          setHistory([...history.slice(0, historyIdx + 1), { image: imageEl }]);
          setHistoryIdx(historyIdx + 1);
          setHistoryLength(historyIdx + 2);
        };
      } else {
        _setImage(image);
        setHistory([...history.slice(0, historyIdx + 1), { image }]);
        setHistoryIdx(historyIdx + 1);
        setHistoryLength(historyIdx + 2);
      }
    },
    [history, setHistory, historyIdx]
  );

  const initImage = useCallback((image: string | HTMLImageElement) => {
    if (typeof image === 'string') {
      const imageEl = new Image();
      imageEl.src = image;

      imageEl.onload = () => {
        _setImage(imageEl);
        setHistory([{ image: imageEl }]);
        setHistoryIdx(0);
        setHistoryLength(1);
      };
    } else {
      _setImage(image);
      setHistory([{ image }]);
      setHistoryIdx(0);
      setHistoryLength(1);
    }
  }, []);

  const imageContextValue = useMemo(() => {
    return {
      image: history[historyIdx]?.image || image,
      setImage,
      initImage,
    };
  }, [setImage, initImage, history, historyIdx, image]);

  const imageHistoryContextValue = useMemo(() => {
    return {
      history,
      setHistory,
      historyIdx,
      setHistoryIdx,
      historyLength,
      setHistoryLength,
    };
  }, [
    history,
    setHistory,
    historyIdx,
    setHistoryIdx,
    historyLength,
    setHistoryLength,
  ]);

  return (
    <ImageContext.Provider value={imageContextValue}>
      <ImageHistoryContext.Provider value={imageHistoryContextValue}>
        {children}
      </ImageHistoryContext.Provider>
    </ImageContext.Provider>
  );
};

export default ImageProvider;
