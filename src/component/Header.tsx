import { ChangeEvent, useContext } from 'react';
import {
  ImageContextDispatch,
  ImageContextState,
} from '../context/ImageContext';
import { loadImage } from '../utils/imageUtils';

const Header = () => {
  const { image } = useContext(ImageContextState);
  const { initImage } = useContext(ImageContextDispatch);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files;
      const fileUrl = URL.createObjectURL(file[0]);
      const img = await loadImage(fileUrl);
      initImage(img);
    }
  };
  const downloadImage = () => {
    if (!image) return;
    const aElement = document.createElement('a');
    aElement.href = image.src;
    const date = new Date();
    aElement.download = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    aElement.click();
    aElement.remove();
  };
  return (
    <header className="w-full py-4 px-4 border-b">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <p className="text-2xl text-blue-900 cursor-pointer">
          <b>Woo3145</b> Image Editor
        </p>
        <div className="flex gap-4">
          <input
            type="file"
            name="input-image"
            id="input-image"
            accept="image/*"
            className="invisible"
            onChange={onChangeFile}
          />
          <label
            htmlFor="input-image"
            className="px-4 py-2 border border-blue-900 rounded-md cursor-pointer hover:bg-gray-100 duration-200"
          >
            이미지 가져오기
          </label>

          <div
            onClick={downloadImage}
            className="px-4 py-2 bg-blue-900 rounded-md text-white cursor-pointer hover:bg-blue-800 duration-200"
          >
            다운로드
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
