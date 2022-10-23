import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

interface ContextState {
  editMode: EditModeType | null;
}
export const EditModeContextState = createContext<ContextState>({
  editMode: null,
});

interface ContextDispatch {
  setEditMode: Dispatch<React.SetStateAction<EditModeType>> | null;
}
export const EditModeContextDispatch = createContext<ContextDispatch>({
  setEditMode: null,
});

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [editMode, setEditMode] = useState<EditModeType>('None');

  const editModeContextStateValue = useMemo(() => {
    return {
      editMode,
    };
  }, [editMode]);

  const editModeContextDispatchValue = useMemo(() => {
    return {
      setEditMode,
    };
  }, [setEditMode]);

  return (
    <EditModeContextState.Provider value={editModeContextStateValue}>
      <EditModeContextDispatch.Provider value={editModeContextDispatchValue}>
        {children}
      </EditModeContextDispatch.Provider>
    </EditModeContextState.Provider>
  );
};
