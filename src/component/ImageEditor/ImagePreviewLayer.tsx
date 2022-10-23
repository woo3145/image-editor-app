import { useContext, useEffect } from 'react';
import { ImageContextState } from '../../context/ImageContext';
import { ImageLayerContextState } from '../../context/ImageLayerContext';
import { resizeImage } from '../../utils/imageUtils';

const ImagePreviewLayer = () => {
  const { previewLayer } = useContext(ImageLayerContextState);
  const { image, degree } = useContext(ImageContextState);

  useEffect(() => {
    if (!previewLayer?.current || !image) return;
    const canvas = previewLayer.current;
    const context = canvas.getContext('2d');

    const { width, height } = resizeImage(image, degree);
    canvas.width = width;
    canvas.height = height;
    if (context === null) return;
    // 캔버스 기준점 저장
    context.save();
    // 기준점을 캔버스 중앙으로 이동 후 캔버스 회전
    context.translate(width / 2, height / 2);
    context.rotate((Math.PI / 180) * degree);
    // 캔버스 이미지의 기준점이 캔버스의 중앙임으로 drawImage()의 dx, dy값을 0으로 잡으면
    // 이미지가 중앙부터 그려짐으로 dx,dy 이동(이미지 w,h의 절반씩 뒤로)
    const originWidth = degree % 180 ? height : width;
    const originHeight = degree % 180 ? width : height;
    context.drawImage(
      image,
      -(originWidth / 2),
      -(originHeight / 2),
      originWidth,
      originHeight
    );
    // 기준점을 다시 되돌려줌(draw layer의 기준점과 다르기 때문에 맞춰줘야함)
    context.restore();
  }, [image, previewLayer, degree]);

  return <canvas className="top-0" ref={previewLayer} />;
};

export default ImagePreviewLayer;
