import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { resizeImage } from '../utils/imageUtils';

export interface IImageSize {
  width: number;
  height: number;
}
interface IImageHistory {
  image: HTMLImageElement;
  imageSize: IImageSize;
}
interface IImageContext {
  image: HTMLImageElement | null;
  imageSize: IImageSize | null;
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
  imageSize: null,
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
  const [imageSize, setImageSize] = useState<IImageSize>({
    width: 0,
    height: 0,
  });
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
          const imageSize = resizeImage(imageEl);
          setImageSize(imageSize);
          setHistory([
            ...history.slice(0, historyIdx + 1),
            { image: imageEl, imageSize },
          ]);
          setHistoryIdx(historyIdx + 1);
          setHistoryLength(historyIdx + 2);
        };
      } else {
        _setImage(image);
        setImageSize(resizeImage(image));
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
        const imageSize = resizeImage(imageEl);
        setImageSize(imageSize);
        setHistory([{ image: imageEl, imageSize }]);
        setHistoryIdx(0);
        setHistoryLength(1);
      };
    } else {
      _setImage(image);
      setImageSize(resizeImage(image));
    }
  }, []);

  const imageContextValue = useMemo(() => {
    return {
      imageSize,
      image,
      setImage,
      initImage,
    };
  }, [image, imageSize, setImage, initImage]);

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
