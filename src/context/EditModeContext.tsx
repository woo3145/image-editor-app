import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface ContextState {
  editMode: EditModeType | null;
  setEditMode: Dispatch<React.SetStateAction<EditModeType>> | null;
}
export const EditModeContext = createContext<ContextState>({
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
