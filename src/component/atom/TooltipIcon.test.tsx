import { render, screen } from '@testing-library/react';
import { IoCropOutline } from 'react-icons/io5';
import TooltipIcon from './TooltipIcon';

it('Atom - <TooltipIcon/>', () => {
  render(
    <TooltipIcon
      icon={<IoCropOutline className="text-2xl" data-testid="icon" />}
      tooltip={'Crop'}
    />
  );
  expect(screen.getByText('Crop')).toBeInTheDocument();
  expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
});
