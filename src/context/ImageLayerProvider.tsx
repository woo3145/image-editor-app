import { createContext, ReactNode, RefObject, useMemo, useRef } from 'react';
import DragAreaProvider from './DragAreaProvider';

interface IImageLayerContext {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
  cropLayer: RefObject<HTMLCanvasElement> | null;
}

export const ImageLayerContext = createContext<IImageLayerContext>({
  previewLayer: null,
  dragLayer: null,
  cropLayer: null,
});

interface Props {
  children: ReactNode;
}

const ImageLayerProvider = ({ children }: Props) => {
  const previewLayer = useRef(null);
  const dragLayer = useRef(null);
  const cropLayer = useRef(null);

  const imageLayerContextValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
      cropLayer,
    };
  }, [previewLayer]);

  return (
    <ImageLayerContext.Provider value={imageLayerContextValue}>
      <DragAreaProvider>{children}</DragAreaProvider>
    </ImageLayerContext.Provider>
  );
};

export default ImageLayerProvider;
