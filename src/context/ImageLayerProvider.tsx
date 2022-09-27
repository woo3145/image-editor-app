import { createContext, ReactNode, RefObject, useMemo, useRef } from 'react';

interface IImageLayerContext {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
}

export const ImageLayerContext = createContext<IImageLayerContext>({
  previewLayer: null,
  dragLayer: null,
});

interface Props {
  children: ReactNode;
}

const ImageLayerProvider = ({ children }: Props) => {
  const previewLayer = useRef(null);
  const dragLayer = useRef(null);

  const imageLayerContextValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
    };
  }, [previewLayer]);

  return (
    <ImageLayerContext.Provider value={imageLayerContextValue}>
      {children}
    </ImageLayerContext.Provider>
  );
};

export default ImageLayerProvider;
