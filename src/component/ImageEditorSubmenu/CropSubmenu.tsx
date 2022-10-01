import { MouseEvent, ReactNode, useContext, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { GiSquare } from 'react-icons/gi';
import { IoCloseOutline } from 'react-icons/io5';
import { EditModeContext } from '../../context/EditModeProvider';
import {
  DragAreaContext,
  ImageLayerContext,
} from '../../context/ImageLayerProvider';

interface Props {
  applyEditedImage: (editedImage: ImageData) => void;
}

const CropSubmenu = ({ applyEditedImage }: Props) => {
  const [cropMode, setCropMode] = useState('Custom');
  const { dragArea, setDragArea } = useContext(DragAreaContext);
  const { previewLayer } = useContext(ImageLayerContext);
  const { setEditMode } = useContext(EditModeContext);

  const onClickModeChange = (e: MouseEvent<HTMLDivElement>) => {
    setCropMode(e.currentTarget.id);
  };

  const onClickApply = () => {
    if (!previewLayer?.current || !dragArea || !setDragArea) return;
    const previewCanvas = previewLayer.current;
    const previewContext = previewCanvas.getContext('2d');

    const cropedImage = previewContext?.getImageData(
      dragArea.x,
      dragArea.y,
      dragArea.width,
      dragArea.height
    );

    if (!cropedImage) return;
    applyEditedImage(cropedImage);
  };

  const onClickCancel = () => {
    if (!setDragArea || !setEditMode) return;
    setDragArea({ x: 0, y: 0, width: 0, height: 0 });
    setEditMode('None');
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
