import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  useMemo,
  useRef,
  useState,
} from 'react';

interface IDragArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IImageLayerContext {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
  cropLayer: RefObject<HTMLCanvasElement> | null;
}
interface IDragAreaContext {
  dragArea: IDragArea | null;
  setDragArea: Dispatch<React.SetStateAction<IDragArea>> | null;
}

export const ImageLayerContext = createContext<IImageLayerContext>({
  previewLayer: null,
  dragLayer: null,
  cropLayer: null,
});

export const DragAreaContext = createContext<IDragAreaContext>({
  dragArea: null,
  setDragArea: null,
});

interface Props {
  children: ReactNode;
}

const ImageLayerProvider = ({ children }: Props) => {
  const previewLayer = useRef(null);
  const dragLayer = useRef(null);
  const cropLayer = useRef(null);

  const [dragArea, setDragArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const imageLayerContextValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
      cropLayer,
    };
  }, [previewLayer]);

  const dragAreaContextValue = useMemo(() => {
    return { dragArea, setDragArea };
  }, [dragArea, setDragArea]);

  return (
    <ImageLayerContext.Provider value={imageLayerContextValue}>
      <DragAreaContext.Provider value={dragAreaContextValue}>
        {children}
      </DragAreaContext.Provider>
    </ImageLayerContext.Provider>
  );
};

export default ImageLayerProvider;
