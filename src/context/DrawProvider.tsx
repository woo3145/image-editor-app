import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface IDrawContext {
  color: string;
  setColor: Dispatch<React.SetStateAction<string>> | null;
  range: number;
  setRange: Dispatch<React.SetStateAction<number>> | null;
  penType: string;
  setPenType: Dispatch<React.SetStateAction<string>> | null;
}

export const DrawContext = createContext<IDrawContext>({
  color: '#000000',
  setColor: () => {},
  range: 10,
  setRange: () => {},
  penType: 'Pen',
  setPenType: () => {},
});

interface Props {
  children: ReactNode;
}

const DrawProvider = ({ children }: Props) => {
  const [color, setColor] = useState('#000000');
  const [range, setRange] = useState(10);
  const [penType, setPenType] = useState('Pen');
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
