import ImagePreview from './ImagePreview';

interface Props {
  imageUrl: string;
}

const ImageEditor = ({ imageUrl }: Props) => {
  return (
    <div className="w-full max-w-screen-lg pt-8">
      <div className="w-full flex items-center justify-center">
        <ImagePreview imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default ImageEditor;
