import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

export type PenType = 'Free' | 'Straight';

export const isPenType = (mode: string): mode is PenType => {
  return ['Free', 'Straight'].includes(mode);
};

interface IDrawContext {
  color: string;
  setColor: Dispatch<React.SetStateAction<string>> | null;
  range: number;
  setRange: Dispatch<React.SetStateAction<number>> | null;
  penType: PenType;
  setPenType: Dispatch<React.SetStateAction<PenType>> | null;
}

export const DrawContext = createContext<IDrawContext>({
  color: '#000000',
  setColor: () => {},
  range: 10,
  setRange: () => {},
  penType: 'Free',
  setPenType: () => {},
});

interface Props {
  children: ReactNode;
}

const DrawProvider = ({ children }: Props) => {
  const [color, setColor] = useState('#000000');
  const [range, setRange] = useState(10);
  const [penType, setPenType] = useState<PenType>('Free');
  const drawContextValue = useMemo(() => {
    return {
      color,
      setColor,
      range,
      setRange,
      penType,
      setPenType,
    };
  }, [color, setColor, range, setRange, penType, setPenType]);

  return (
    <DrawContext.Provider value={drawContextValue}>
      {children}
    </DrawContext.Provider>
  );
};

export default DrawProvider;
