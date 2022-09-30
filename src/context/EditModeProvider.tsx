import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

export type EditModeType = 'Crop' | 'Draw' | 'Rotate' | 'None';

export const isEditModeType = (mode: string): mode is EditModeType => {
  return ['Crop', 'Draw', 'Rotate', 'None'].includes(mode);
};
interface IEditModeContext {
  editMode: EditModeType | null;
  setEditMode: Dispatch<React.SetStateAction<EditModeType>> | null;
}
export const EditModeContext = createContext<IEditModeContext>({
  editMode: null,
  setEditMode: null,
});

interface Props {
  children: ReactNode;
}

const EditModeProvider = ({ children }: Props) => {
  const [editMode, setEditMode] = useState<EditModeType>('None');

  const editModeContextValue = useMemo(() => {
    return {
      editMode,
      setEditMode,
    };
  }, [editMode]);

  return (
    <EditModeContext.Provider value={editModeContextValue}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeProvider;
