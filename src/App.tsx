import { useState } from 'react';
import ModeController from './component/ModeController';
import Header from './component/Header';
import HistoryController from './component/HistoryController';
import ImageEditor from './component/ImageEditor';
import DragAreaProvider from './context/DragAreaProvider';
import DrawProvider from './context/DrawProvider';
import EditModeProvider from './context/EditModeProvider';
import ImageLayerProvider from './context/ImageLayerProvider';
import ImageProvider from './context/ImageProvider';

const SAMPLE_IMAGE1 = '/alvan-nee-lvFlpqEvuRM-unsplash.jpg';
const SAMPLE_IMAGE2 = '/lachlan-gowen-cWwqwN2uTo4-unsplash.jpg';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageProvider>
      <div className="font-light tracking-wider">
        <Header setImageUrl={setImageUrl} />
        <div className="max-w-screen-2xl mx-auto py-8 flex flex-col items-center">
          <EditModeProvider>
            <div className="flex divide-x-2">
              <ModeController />
              <HistoryController />
            </div>
            {/* Image Editor */}
            <ImageLayerProvider>
              <DragAreaProvider>
                <DrawProvider>
                  <ImageEditor imageUrl={imageUrl} />
                </DrawProvider>
              </DragAreaProvider>
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
    </ImageProvider>
  );
}

export default App;
