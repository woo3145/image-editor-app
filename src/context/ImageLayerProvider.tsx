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

interface IImageLayerContext {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
  cropLayer: RefObject<HTMLCanvasElement> | null;
  drawLayer: RefObject<HTMLCanvasElement> | null;
  degree: number;
  setDegree: Dispatch<SetStateAction<number>>;
}

export const ImageLayerContext = createContext<IImageLayerContext>({
  previewLayer: null,
  dragLayer: null,
  cropLayer: null,
  drawLayer: null,
  degree: 0,
  setDegree: () => null,
});

interface Props {
  children: ReactNode;
}

const ImageLayerProvider = ({ children }: Props) => {
  const { image } = useContext(ImageContextState);
  const previewLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);
  const cropLayer = useRef<HTMLCanvasElement>(null);
  const drawLayer = useRef<HTMLCanvasElement>(null);
  const { addHistory } = useImageDispatch();

  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const canvas = previewLayer.current;
    if (!canvas || !image) return;
    const imageEl = new Image();
    imageEl.src = canvas.toDataURL();
    addHistory(image, degree);
    // deree가 변경 될 때만 호출 됨
    // eslint-disable-next-line
  }, [degree]);

  const imageLayerContextValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
      cropLayer,
      drawLayer,
      degree,
      setDegree,
    };
  }, [previewLayer, degree, setDegree]);

  return (
    <ImageLayerContext.Provider value={imageLayerContextValue}>
      {children}
    </ImageLayerContext.Provider>
  );
};

export default ImageLayerProvider;
