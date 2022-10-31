import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import {
  EditModeContextDispatch,
  EditModeContextState,
  EditModeProvider,
} from './EditModeContext';

describe('<EditModeContext />', () => {
  const TestComponent = () => {
    const { editMode } = useContext(EditModeContextState);
    const { setEditMode } = useContext(EditModeContextDispatch);
    const onClick = () => {
      if (!setEditMode) return;
      setEditMode('Crop' as EditModeType);
    };
    return (
      <>
        <div data-testid={'value'}>{editMode}</div>
        <button onClick={onClick}>f</button>
      </>
    );
  };
  it('editMode의 값이 잘 변경되는가', () => {
    render(
      <EditModeProvider>
        <TestComponent />
      </EditModeProvider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('None');
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('value')).toHaveTextContent('Crop');
  });
});
