import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useImageDispatch from '../hooks/useImageDispatch';
import { ImageContextState } from './ImageContext';

interface ContextState {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
  cropLayer: RefObject<HTMLCanvasElement> | null;
  drawLayer: RefObject<HTMLCanvasElement> | null;
  degree: number;
}
interface ContextDispatch {
  setDegree: Dispatch<SetStateAction<number>>;
}

export const ImageLayerContextState = createContext<ContextState>({
  previewLayer: null,
  dragLayer: null,
  cropLayer: null,
  drawLayer: null,
  degree: 0,
});
export const ImageLayerContextDispatch = createContext<ContextDispatch>({
  setDegree: () => null,
});

export const ImageLayerProvider = ({ children }: { children: ReactNode }) => {
  const previewLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);
  const cropLayer = useRef<HTMLCanvasElement>(null);
  const drawLayer = useRef<HTMLCanvasElement>(null);
  const [degree, setDegree] = useState(0);

  const { image } = useContext(ImageContextState);
  const { addHistory } = useImageDispatch();

  useEffect(() => {
    if (!image) return;
    addHistory(image, degree, 'rotate');
    // deree가 변경 될 때만 호출 됨
    // eslint-disable-next-line
  }, [degree]);

  const imageLayerContexStatetValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
      cropLayer,
      drawLayer,
      degree,
    };
  }, [previewLayer, degree]);
  const imageLayerContextDispatchValue = useMemo(() => {
    return {
      setDegree,
    };
  }, [setDegree]);

  return (
    <ImageLayerContextState.Provider value={imageLayerContexStatetValue}>
      <ImageLayerContextDispatch.Provider
        value={imageLayerContextDispatchValue}
      >
        {children}
      </ImageLayerContextDispatch.Provider>
    </ImageLayerContextState.Provider>
  );
};
