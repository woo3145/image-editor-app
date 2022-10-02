import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface IDragArea {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface IDragAreaContext {
  dragArea: IDragArea | null;
  setDragArea: Dispatch<React.SetStateAction<IDragArea>> | null;
  isEmpty: boolean;
  resetDragArea: () => void;
}

export const DragAreaContext = createContext<IDragAreaContext>({
  dragArea: null,
  setDragArea: null,
  isEmpty: false,
  resetDragArea: () => {},
});

interface Props {
  children: ReactNode;
}

const DragAreaProvider = ({ children }: Props) => {
  const [dragArea, setDragArea] = useState({
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

  const dragAreaContextValue = useMemo(() => {
    return {
      dragArea,
      setDragArea,
      isEmpty,
      resetDragArea,
    };
  }, [dragArea, setDragArea, resetDragArea, isEmpty]);

  return (
    <DragAreaContext.Provider value={dragAreaContextValue}>
      {children}
    </DragAreaContext.Provider>
  );
};

export default DragAreaProvider;
