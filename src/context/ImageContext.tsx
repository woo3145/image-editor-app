import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';
import { resizeImage } from '../utils/imageUtils';

interface ContextState {
  image: HTMLImageElement | null;
  degree: number;
  imageSize: ImageSize | null;
  rootImage: HTMLImageElement | null;
  history: ImageHistoryNode[] | null;
  historyIdx: number | null;
}

export const ImageContextState = createContext<ContextState>({
  image: null,
  degree: 0,
  imageSize: null,
  rootImage: null,
  history: null,
  historyIdx: null,
});

interface ContextDispatch {
  setHistoryIdx: Dispatch<React.SetStateAction<number>> | null;
  setHistory: Dispatch<React.SetStateAction<ImageHistoryNode[]>> | null;
  setRootImage: Dispatch<React.SetStateAction<HTMLImageElement | null>> | null;
}
export const ImageContextDispatch = createContext<ContextDispatch>({
  setHistoryIdx: null,
  setHistory: null,
  setRootImage: null,
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
      image: curImage ? curImage.image : null,
      degree: curImage ? curImage.degree : 0,
      imageSize,
      rootImage,
      history: history,
      historyIdx: historyIdx,
    };
  }, [history, historyIdx, rootImage, curImage, imageSize]);

  const imageContextDispatchValue = useMemo(() => {
    return {
      setHistory,
      setHistoryIdx,
      setRootImage,
    };
  }, [setHistory, setHistoryIdx, setRootImage]);

  return (
    <ImageContextState.Provider value={imageContextStateValue}>
      <ImageContextDispatch.Provider value={imageContextDispatchValue}>
        {children}
      </ImageContextDispatch.Provider>
    </ImageContextState.Provider>
  );
};
