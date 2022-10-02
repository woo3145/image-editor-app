import { MouseEvent, ReactNode, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { GiSquare } from 'react-icons/gi';
import { IoCloseOutline } from 'react-icons/io5';
import useCropImage from '../../hooks/useCropImage';

const CropSubmenu = () => {
  const [cropMode, setCropMode] = useState('Custom');
  const { onClickApply, onClickCancel } = useCropImage();

  const onClickModeChange = (e: MouseEvent<HTMLDivElement>) => {
    setCropMode(e.currentTarget.id);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3">
        <CropSubmenuItem
          onClick={onClickModeChange}
          icon={<GiSquare className="text-3xl" />}
          text={'Custom'}
          selected={cropMode === 'Custom'}
        />
      </div>
      <div className="flex gap-4 mt-4">
        <div
          onClick={onClickApply}
          className="flex items-center gap-2 text-lg cursor-pointer opacity-60 hover:opacity-100"
        >
          <BsCheck2 />
          적용
        </div>
        <div
          onClick={onClickCancel}
          className="flex items-center gap-2 text-lg cursor-pointer opacity-60 hover:opacity-100"
        >
          <IoCloseOutline />
          취소
        </div>
      </div>
    </div>
  );
};

interface CropSubmenuItemProps {
  icon: ReactNode;
  text: string;
  selected: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
const CropSubmenuItem = ({
  icon,
  text,
  selected,
  onClick,
}: CropSubmenuItemProps) => {
  return (
    <div
      id={text}
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer ${
        selected ? 'opacity-100' : 'opacity-60'
      }`}
    >
      {icon}
      <p className="text-xs pt-1">{text}</p>
    </div>
  );
};

export default CropSubmenu;
