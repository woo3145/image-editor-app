import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  const previewLayer = useRef(null);
  const dragLayer = useRef(null);
  const cropLayer = useRef(null);
  const drawLayer = useRef(null);

  const [degree, setDegree] = useState(0);

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
