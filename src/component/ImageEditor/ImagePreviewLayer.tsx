import { useContext, useEffect } from 'react';
import { ImageLayerContext } from '../../context/ImageLayerProvider';
import { ImageContext } from '../../context/ImageProvider';
import { resizeImage } from '../../utils/imageUtils';

const ImagePreviewLayer = () => {
  const { previewLayer, degree } = useContext(ImageLayerContext);
  const { image } = useContext(ImageContext);

  useEffect(() => {
    console.log('Preview Layer Create', degree);
    if (!previewLayer?.current || !image) return;
    const canvas = previewLayer.current;
    const context = canvas.getContext('2d');

    const resizedImage = resizeImage(image);
    // 각도가 90, 270 (세로) 일땐 가로와 세로크기 바꿔줌
    const width = degree % 180 ? resizedImage.height : resizedImage.width;
    const height = degree % 180 ? resizedImage.width : resizedImage.height;
    canvas.width = width;
    canvas.height = height;
    // 캔버스 기준점 저장
    context?.save();
    // 기준점을 캔버스 중앙으로 이동 후 캔버스 회전
    context?.translate(width / 2, height / 2);
    context?.rotate((Math.PI / 180) * degree);
    // 캔버스 이미지의 기준점이 캔버스의 중앙임으로 drawImage()의 dx, dy값을 0으로 잡으면
    // 이미지가 중앙부터 그려짐으로 dx,dy 이동(이미지 w,h의 절반씩 뒤로)
    context?.drawImage(
      image,
      -(resizedImage.width / 2),
      -(resizedImage.height / 2),
      resizedImage.width,
      resizedImage.height
    );
    // 기준점을 다시 되돌려줌(draw layer의 기준점과 다르기 때문에 맞춰줘야함)
    context?.restore();
  }, [image, previewLayer, degree]);

  return <canvas className="top-0" ref={previewLayer} />;
};

export default ImagePreviewLayer;
