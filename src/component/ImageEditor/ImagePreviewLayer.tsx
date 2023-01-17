import { useContext, useEffect } from 'react';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';

const ImagePreviewLayer = () => {
  const { previewLayer } = useContext(ImageLayerContextState);
  const { image, degree, imageSize } = useContext(ImageContextState);

  useEffect(() => {
    if (!previewLayer?.current || !image || !imageSize) return;
    const canvas = previewLayer.current;
    const context = canvas.getContext('2d');

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    if (context === null) return;
    // 캔버스 기준점 저장
    context.save();
    // 기준점을 캔버스 중앙으로 이동 후 캔버스 회전
    context.translate(imageSize.width / 2, imageSize.height / 2);
    context.rotate((Math.PI / 180) * degree);
    // 캔버스 이미지의 기준점이 캔버스의 중앙임으로 drawImage()의 dx, dy값을 0으로 잡으면
    // 이미지가 중앙부터 그려짐으로 dx,dy 이동(이미지 w,h의 절반씩 뒤로)
    const originWidth = degree % 180 ? imageSize.height : imageSize.width;
    const originHeight = degree % 180 ? imageSize.width : imageSize.height;
    context.drawImage(
      image,
      -(originWidth / 2),
      -(originHeight / 2),
      originWidth,
      originHeight
    );
    // 기준점을 다시 되돌려줌(draw layer의 기준점과 다르기 때문에 맞춰줘야함)
    context.restore();
  }, [image, previewLayer, degree, imageSize]);

  return (
    <canvas className="top-0 border-2 border-blue-900" ref={previewLayer} />
  );
};

export default ImagePreviewLayer;
