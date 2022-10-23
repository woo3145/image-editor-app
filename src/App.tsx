import EditModeController from './component/Controller/EditModeController';
import Header from './component/Header';
import HistoryController from './component/Controller/HistoryController';
import ImageEditor from './component/ImageEditor';
import { DragAreaProvider } from './context/DragAreaContext';
import { DrawProvider } from './context/DrawContext';
import { EditModeProvider } from './context/EditModeContext';
import { ImageLayerProvider } from './context/ImageLayerContext';
import { ImageProvider } from './context/ImageContext';
import SampleImagePicker from './component/SampleImagePicker';

function App() {
  return (
    <ImageProvider>
      <div className="font-light tracking-wider">
        <Header />
        <div className="max-w-screen-2xl mx-auto py-8 flex flex-col items-center">
          <EditModeProvider>
            <div className="flex divide-x-2">
              <EditModeController />
              <HistoryController />
            </div>
            {/* Image Editor */}
            <ImageLayerProvider>
              <DragAreaProvider>
                <DrawProvider>
                  <ImageEditor />
                </DrawProvider>
              </DragAreaProvider>
            </ImageLayerProvider>
          </EditModeProvider>
          <SampleImagePicker />
        </div>
      </div>
    </ImageProvider>
  );
}

export default App;
