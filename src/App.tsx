import React, { useState } from 'react';
import Controller from './component/Controller';
import Header from './component/Header';
import ImageEditor from './component/ImageEditor';
import EditModeProvider from './context/EditModeProvider';
import ImageLayerProvider from './context/ImageLayerProvider';

const SAMPLE_IMAGE1 = '/alvan-nee-lvFlpqEvuRM-unsplash.jpg';
const SAMPLE_IMAGE2 = '/lachlan-gowen-cWwqwN2uTo4-unsplash.jpg';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="font-light tracking-wider">
      <Header />
      <div className="max-w-screen-2xl mx-auto py-8 flex flex-col items-center">
        <EditModeProvider>
          <Controller />
          {/* Image Editor */}
          <ImageLayerProvider>
            <ImageEditor imageUrl={imageUrl} />
          </ImageLayerProvider>
          <div className="flex items-center gap-6 pt-8">
            <div
              onClick={() => setImageUrl(SAMPLE_IMAGE1)}
              className="px-12 py-2 bg-blue-900 text-white rounded-md cursor-pointer"
            >
              이미지 1
            </div>
            <div
              onClick={() => setImageUrl(SAMPLE_IMAGE2)}
              className="px-12 py-2 bg-purple-900 text-white rounded-md cursor-pointer"
            >
              이미지 2
            </div>
          </div>
        </EditModeProvider>
      </div>
    </div>
  );
}

export default App;
