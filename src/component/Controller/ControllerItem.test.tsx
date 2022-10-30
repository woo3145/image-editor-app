import { render, screen } from '@testing-library/react';
import { IoCropOutline } from 'react-icons/io5';
import ControllerItem from './ControllerItem';

describe('<ControllerItem/>', () => {
  const onClick = jest.fn();
  it('Common 상태', () => {
    render(
      <ControllerItem
        selected={false}
        disabled={false}
        onClickHandler={onClick}
        icon={<IoCropOutline className="text-2xl" data-testid="icon" />}
        text={'Crop'}
      />
    );
    expect(screen.getByText('Crop')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
    expect(screen.getByRole('listitem')).toHaveClass(
      'hover:bg-blue-900 hover:text-white'
    );
  });
  it('Selected 상태', () => {
    render(
      <ControllerItem
        selected={true}
        disabled={false}
        onClickHandler={onClick}
        icon={<IoCropOutline className="text-2xl" data-testid="icon" />}
        text={'Crop'}
      />
    );
    expect(screen.getByText('Crop')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
    expect(screen.getByRole('listitem')).toHaveClass('text-white');
    expect(screen.getByRole('listitem')).toHaveClass('bg-blue-900');
  });
  it('Disabled 상태', () => {
    render(
      <ControllerItem
        selected={false}
        disabled={true}
        onClickHandler={onClick}
        icon={<IoCropOutline className="text-2xl" data-testid="icon" />}
        text={'Crop'}
      />
    );
    expect(screen.getByText('Crop')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
    expect(screen.getByRole('listitem')).not.toHaveClass('bg-blue-900');
    expect(screen.getByRole('listitem')).toHaveClass('text-gray-400');
  });
  it('만약 selected, disabled 상태가 둘다 true일 경우 disabled 처리', () => {
    render(
      <ControllerItem
        selected={true}
        disabled={true}
        onClickHandler={onClick}
        icon={<IoCropOutline className="text-2xl" data-testid="icon" />}
        text={'Crop'}
      />
    );
    expect(screen.getByText('Crop')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('text-2xl');
    expect(screen.getByRole('listitem')).not.toHaveClass('bg-blue-900');
    expect(screen.getByRole('listitem')).toHaveClass('text-gray-400');
  });
});
