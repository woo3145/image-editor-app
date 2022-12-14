import { useContext } from 'react';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';
import { ImageContextDispatch } from '../../../context/ImageContext';

const RotateSubmenu = () => {
  const { rotateLeft, rotateRight } = useContext(ImageContextDispatch);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-7">
        <div
          onClick={rotateRight}
          className={`flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100`}
        >
          <GrRotateRight className="text-3xl" />
          <p className="text-xs pt-1">90</p>
        </div>
        <div
          onClick={rotateLeft}
          className={`flex flex-col items-center cursor-pointer opacity-60 hover:opacity-100`}
        >
          <GrRotateLeft className="text-3xl" />
          <p className="text-xs pt-1">-90</p>
        </div>
      </div>
    </div>
  );
};

export default RotateSubmenu;
