import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import {
  DragAreaContextDispatch,
  DragAreaContextState,
  DragAreaProvider,
} from './DragAreaContext';

describe('<DragAreaContext />', () => {
  const TestComponent = () => {
    const { dragArea, isEmpty } = useContext(DragAreaContextState);
    const { setDragArea, resetDragArea } = useContext(DragAreaContextDispatch);

    const testSetDragArea = () => {
      if (!setDragArea) return;
      setDragArea({ x: 20, y: 20, width: 100, height: 100 });
    };
    const testResetDragArea = () => {
      if (!resetDragArea) return;
      resetDragArea();
    };

    return (
      <>
        <div data-testid="value">
          {dragArea
            ? `${dragArea.x} ${dragArea.y} ${dragArea.width} ${dragArea.height}`
            : 'null'}
        </div>
        <div data-testid="empty_value">{isEmpty ? 'true' : 'false'}</div>
        <button data-testid="set_button" onClick={testSetDragArea}>
          set
        </button>
        <button data-testid="reset_button" onClick={testResetDragArea}>
          reset
        </button>
      </>
    );
  };
  it('기본기능', () => {
    render(
      <DragAreaProvider>
        <TestComponent />
      </DragAreaProvider>
    );
    expect(screen.getByTestId('value')).toHaveTextContent('0 0 0 0');
    expect(screen.getByTestId('empty_value')).toHaveTextContent('true');

    userEvent.click(screen.getByTestId('set_button'));
    expect(screen.getByTestId('value')).toHaveTextContent('20 20 100 100');
    expect(screen.getByTestId('empty_value')).toHaveTextContent('false');

    userEvent.click(screen.getByTestId('reset_button'));
    expect(screen.getByTestId('value')).toHaveTextContent('0 0 0 0');
    expect(screen.getByTestId('empty_value')).toHaveTextContent('true');
  });
});
