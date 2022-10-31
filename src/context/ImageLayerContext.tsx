import { createContext, ReactNode, RefObject, useMemo, useRef } from 'react';

interface ContextState {
  previewLayer: RefObject<HTMLCanvasElement> | null;
  dragLayer: RefObject<HTMLCanvasElement> | null;
  cropLayer: RefObject<HTMLCanvasElement> | null;
  drawLayer: RefObject<HTMLCanvasElement> | null;
}

export const ImageLayerContextState = createContext<ContextState>({
  previewLayer: null,
  dragLayer: null,
  cropLayer: null,
  drawLayer: null,
});

export const ImageLayerProvider = ({ children }: { children: ReactNode }) => {
  const previewLayer = useRef<HTMLCanvasElement>(null);
  const dragLayer = useRef<HTMLCanvasElement>(null);
  const cropLayer = useRef<HTMLCanvasElement>(null);
  const drawLayer = useRef<HTMLCanvasElement>(null);

  const imageLayerContexStatetValue = useMemo(() => {
    return {
      previewLayer,
      dragLayer,
      cropLayer,
      drawLayer,
    };
  }, [previewLayer]);

  return (
    <ImageLayerContextState.Provider value={imageLayerContexStatetValue}>
      {children}
    </ImageLayerContextState.Provider>
  );
};
