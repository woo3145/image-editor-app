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
import { ImageContext } from './ImageProvider';

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
  const { image } = useContext(ImageContext);
  const previewLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);
  const cropLayer = useRef<HTMLCanvasElement>(null);
  const drawLayer = useRef<HTMLCanvasElement>(null);

  const [degree, setDegree] = useState(0);

  useEffect(() => {
    setDegree(0);
  }, [image]);

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
