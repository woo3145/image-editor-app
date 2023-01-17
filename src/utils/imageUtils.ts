const CANVAS_MAX_WIDTH = 800;
const CANVAS_MAX_HEIGHT = 600;

// 캔버스 최대 크기 값에 이미지 비율을 조정해주는 함수
export const resizeImage = (
  image: HTMLImageElement | { width: number; height: number },
  degree: number
): { width: number; height: number } => {
  const w = degree % 180 ? image.height : image.width;
  const h = degree % 180 ? image.width : image.height;
  if (w > h) {
    // 가로 이미지
    const width = w < CANVAS_MAX_WIDTH ? w : CANVAS_MAX_WIDTH;

    return {
      width: width,
      height: (h * width) / w,
    };
  } else {
    // 세로 이미지

    const height = h < CANVAS_MAX_HEIGHT ? h : CANVAS_MAX_HEIGHT;
    return {
      width: (w * height) / h,
      height: height,
    };
  }
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.alt = 'image';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};
