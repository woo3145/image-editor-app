export const isEditModeType = (mode: string): mode is EditModeType => {
  return ['Crop', 'Draw', 'Rotate', 'None'].includes(mode);
};
