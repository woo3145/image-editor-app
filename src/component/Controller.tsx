import { IoCropOutline, IoPencilOutline } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs';
import TooltipIcon from './TooltipIcon';

const Controller = () => {
  return (
    <ul className="w-full flex items-center justify-center gap-4">
      <li className="p-3 hover:bg-blue-900 hover:text-white rounded-md cursor-pointer group">
        <TooltipIcon
          icon={<IoCropOutline className="text-2xl" />}
          tooltip={'Crop'}
        />
      </li>
      <li className="p-3 hover:bg-blue-900 hover:text-white rounded-md cursor-pointer group">
        <TooltipIcon
          icon={<IoPencilOutline className="text-2xl" />}
          tooltip={'Draw'}
        />
      </li>
      <li className="p-3 hover:bg-blue-900 hover:text-white rounded-md cursor-pointer group">
        <TooltipIcon
          icon={<BsArrowRepeat className="text-2xl" />}
          tooltip={'Rotate'}
        />
      </li>
    </ul>
  );
};

export default Controller;
