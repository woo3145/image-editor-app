import React, { useState } from 'react';
import Controller from './component/Controller';
import Header from './component/Header';
import ImageEditor from './component/ImageEditor';

const SAMPLE_IMAGE = '/alvan-nee-lvFlpqEvuRM-unsplash.jpg';

export type EditModeType = 'Crop' | 'Draw' | 'Rotate' | 'none';
export const isEditModeType = (mode: string): mode is EditModeType => {
  return ['Crop', 'Draw', 'Rotate', 'none'].includes(mode);
};

function App() {
  const [imageURL, setImageURL] = useState(SAMPLE_IMAGE);
  const [editMode, setEditMode] = useState<EditModeType>('Crop');

  return (
    <div className="font-light tracking-wider">
      <Header />
      <div className="max-w-screen-2xl mx-auto py-8">
        <Controller editMode={editMode} setEditMode={setEditMode} />
        {/* Image Editor */}
        <ImageEditor />
      </div>
    </div>
  );
}

export default App;
