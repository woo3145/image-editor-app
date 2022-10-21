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
  degree: number;
}
interface IImageContext {
  image: HTMLImageElement | null;
  degree: number;
  setImage: (image: string | HTMLImageElement, degree: number) => void;
  initImage: (image: string | HTMLImageElement) => void;
}
interface IImageHistoryContext {
  historyIdx: number | null;
  setHistoryIdx: Dispatch<React.SetStateAction<number>> | null;
  history: IImageHistory[] | null;
  setHistory: Dispatch<React.SetStateAction<IImageHistory[]>> | null;
}

export const ImageContext = createContext<IImageContext>({
  image: null,
  degree: 0,
  setImage: () => {},
  initImage: () => {},
});
export const ImageHistoryContext = createContext<IImageHistoryContext>({
  historyIdx: null,
  setHistoryIdx: null,
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

  const setImage = useCallback(
    (image: string | HTMLImageElement, degree: number) => {
      if (typeof image === 'string') {
        const imageEl = new Image();
        imageEl.src = image;

        imageEl.onload = () => {
          _setImage(imageEl);
          setHistory([
            ...history.slice(0, historyIdx + 1),
            { image: imageEl, degree },
          ]);
          setHistoryIdx(historyIdx + 1);
        };
      } else {
        _setImage(image);
        setHistory([...history.slice(0, historyIdx + 1), { image, degree }]);
        setHistoryIdx(historyIdx + 1);
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
        setHistory([{ image: imageEl, degree: 0 }]);
        setHistoryIdx(0);
      };
    } else {
      _setImage(image);
      setHistory([{ image, degree: 0 }]);
      setHistoryIdx(0);
    }
  }, []);

  const imageContextValue = useMemo(() => {
    return {
      image: history[historyIdx]?.image || image,
      degree: history[historyIdx]?.degree || 0,
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
    };
  }, [history, setHistory, historyIdx, setHistoryIdx]);

  return (
    <ImageContext.Provider value={imageContextValue}>
      <ImageHistoryContext.Provider value={imageHistoryContextValue}>
        {children}
      </ImageHistoryContext.Provider>
    </ImageContext.Provider>
  );
};

export default ImageProvider;
