import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface ContextState {
  dragArea: DragArea | null;
  isEmpty: boolean;
}
export const DragAreaContextState = createContext<ContextState>({
  dragArea: null,
  isEmpty: false,
});

interface ContextDispatch {
  setDragArea: Dispatch<React.SetStateAction<DragArea>> | null;
  resetDragArea: () => void;
}
export const DragAreaContextDispatch = createContext<ContextDispatch>({
  setDragArea: null,
  resetDragArea: () => {},
});

export const DragAreaProvider = ({ children }: { children: ReactNode }) => {
  const [dragArea, setDragArea] = useState<DragArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const resetDragArea = useCallback(() => {
    setDragArea({ x: 0, y: 0, width: 0, height: 0 });
  }, []);

  const isEmpty = useMemo(() => {
    return (
      dragArea.x === 0 &&
      dragArea.y === 0 &&
      dragArea.width === 0 &&
      dragArea.height === 0
    );
  }, [dragArea]);

  const dragAreaContextStateValue = useMemo(() => {
    return {
      dragArea,
      isEmpty,
    };
  }, [dragArea, isEmpty]);

  const dragAreaContextDispatchValue = useMemo(() => {
    return {
      setDragArea,
      resetDragArea,
    };
  }, [setDragArea, resetDragArea]);

  return (
    <DragAreaContextState.Provider value={dragAreaContextStateValue}>
      <DragAreaContextDispatch.Provider value={dragAreaContextDispatchValue}>
        {children}
      </DragAreaContextDispatch.Provider>
    </DragAreaContextState.Provider>
  );
};
