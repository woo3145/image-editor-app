import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface ContextState {
  image: HTMLImageElement | null;
  degree: number;
  rootImage: HTMLImageElement | null;
  history: ImageHistoryNode[] | null;
  historyIdx: number | null;
}

export const ImageContextState = createContext<ContextState>({
  image: null,
  degree: 0,
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

  const imageContextStateValue = useMemo(() => {
    return {
      image: history[historyIdx]?.image || null,
      degree: history[historyIdx]?.degree || 0,
      rootImage,
      history: history,
      historyIdx: historyIdx,
    };
  }, [history, historyIdx, rootImage]);

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
