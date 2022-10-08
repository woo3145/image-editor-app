import { ChangeEvent, useContext } from 'react';
import { RiRulerLine } from 'react-icons/ri';
import { IoPencil } from 'react-icons/io5';
import { DrawContext } from '../../../context/DrawProvider';
import ColorPicker from './ColorPicker';

const DrawSubmenu = () => {
  const { range, setRange } = useContext(DrawContext);
  const { penType, setPenType } = useContext(DrawContext);

  const onChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!setRange) return;
    setRange(parseInt(value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6">
        <div
          onClick={() => {
            if (!setPenType) return;
            setPenType('Free');
          }}
          className="flex flex-col items-center justify-center gap-1"
        >
          <IoPencil
            className={`w-9 h-9 rounded-full cursor-pointer border ${
              penType === 'Free' ? 'opacity-100' : 'opacity-30'
            }`}
          />
          <label className="text-xs">자유</label>
        </div>
        <div
          onClick={() => {
            if (!setPenType) return;
            setPenType('Straight');
          }}
          className="flex flex-col items-center justify-center gap-1"
        >
          <RiRulerLine
            className={`w-9 h-9 rounded-full cursor-pointer border ${
              penType === 'Straight' ? 'opacity-100' : 'opacity-30'
            }`}
          />
          <label className="text-xs">직선</label>
        </div>
        <div className="border-r"></div>
        <ColorPicker />
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        <input
          type="range"
          min={5}
          max={30}
          value={range}
          onChange={onChangeRange}
        />
        <span className="text-xs">{range}</span>
      </div>
    </div>
  );
};

export default DrawSubmenu;
