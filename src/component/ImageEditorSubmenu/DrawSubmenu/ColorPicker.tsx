import { MouseEvent, useContext, useState } from 'react';
import { DrawContext } from '../../../context/DrawProvider';

const colors = [
  'rgb(0,0,0)',
  'rgb(55,65,81)',
  'rgb(107,114,128)',
  'rgb(156,163,175)',
  'rgb(209,213,219)',
  'rgb(229,231,235)',
  'rbg(255,255,255)',
  'rgb(239,68,68)',
  'rgb(251,146,60)',
  'rgb(250,204,21)',
  'rgb(74,222,128)',
  'rgb(96,165,250)',
  'rgb(30,64,175)',
  'rgb(168,85,247)',
];

const ColorPicker = () => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const { color, setColor } = useContext(DrawContext);

  const onClickChangeColor = (e: MouseEvent<HTMLLIElement>) => {
    if (!setColor) return;
    setColor(e.currentTarget.style.backgroundColor);
    setPickerVisible(false);
  };
  const colorPickerToggle = () => {
    setPickerVisible(!pickerVisible);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-1">
      <div
        className={`absolute -bottom-12 z-40 w-auto h-auto px-4 py-2 bg-white border shadow-lg ${
          pickerVisible ? 'visible' : 'invisible'
        }`}
      >
        <ul className="flex items-center justify-center gap-2 flex-wrap w-40">
          {colors.map((color, idx) => {
            return (
              <li
                key={idx}
                onClick={onClickChangeColor}
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-full border border-neutral-300 cursor-pointer"
              />
            );
          })}
        </ul>
      </div>
      <div
        onClick={colorPickerToggle}
        style={{ backgroundColor: color }}
        className="w-9 h-9 rounded-full cursor-pointer border"
      ></div>
      <label className="text-xs">컬러</label>
    </div>
  );
};

export default ColorPicker;
