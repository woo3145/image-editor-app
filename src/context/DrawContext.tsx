import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface ContextState {
  color: string;
  range: number;
  penType: PenType;
}
export const DrawContextState = createContext<ContextState>({
  color: '#000000',
  range: 10,
  penType: 'Free',
});

interface ContextDispatch {
  setColor: Dispatch<React.SetStateAction<string>> | null;
  setRange: Dispatch<React.SetStateAction<number>> | null;
  setPenType: Dispatch<React.SetStateAction<PenType>> | null;
}
export const DrawContextDispatch = createContext<ContextDispatch>({
  setColor: () => {},
  setRange: () => {},
  setPenType: () => {},
});

export const DrawProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState('#000000');
  const [range, setRange] = useState(10);
  const [penType, setPenType] = useState<PenType>('Free');

  const drawContextStateValue = useMemo(() => {
    return {
      color,
      range,
      penType,
    };
  }, [color, range, penType]);

  const drawContextDispatchValue = useMemo(() => {
    return {
      setColor,
      setRange,
      setPenType,
    };
  }, [setColor, setRange, setPenType]);

  return (
    <DrawContextState.Provider value={drawContextStateValue}>
      <DrawContextDispatch.Provider value={drawContextDispatchValue}>
        {children}
      </DrawContextDispatch.Provider>
    </DrawContextState.Provider>
  );
};
