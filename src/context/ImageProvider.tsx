import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { resizeImage } from '../utils/imageUtils';

export interface IImageSize {
  width: number;
  height: number;
}
interface IImageContext {
  image: HTMLImageElement | null;
  imageSize: IImageSize | null;
  setImage: (imageUrl: string) => void;
}

export const ImageContext = createContext<IImageContext>({
  image: null,
  imageSize: null,
  setImage: () => {},
});

interface Props {
  children: ReactNode;
}

const ImageProvider = ({ children }: Props) => {
  const [imageSize, setImageSize] = useState<IImageSize>({
    width: 0,
    height: 0,
  });
  const [image, _setImage] = useState<HTMLImageElement | null>(null);

  const setImage = useCallback((imageUrl: string) => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      _setImage(image);
      setImageSize(resizeImage(image));
    };
  }, []);

  const imageContextValue = useMemo(() => {
    return {
      imageSize,
      image,
      setImage,
    };
  }, [image, imageSize, setImage]);

  return (
    <ImageContext.Provider value={imageContextValue}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
