import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

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

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
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
