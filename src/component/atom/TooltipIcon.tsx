import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  tooltip?: string;
}

const TooltipIcon = ({ icon, tooltip }: Props) => {
  return (
    <div className="group relative flex justify-center">
      {icon}
      {tooltip && (
        <div
          className="inline-block absolute invisible group-hover:visible z-10 bottom-10
         py-1 px-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default TooltipIcon;
