const CANVAS_MAX_WIDTH = 800;
const CANVAS_MAX_HEIGHT = 600;

// 캔버스 최대 크기 값에 이미지 비율을 조정해주는 함수
export const resizeImage = (
  image: HTMLImageElement
): { width: number; height: number } => {
  if (image.width > image.height) {
    // 가로 이미지
    return {
      width: CANVAS_MAX_WIDTH,
      height: (image.height * CANVAS_MAX_WIDTH) / image.width,
    };
  } else {
    // 세로 이미지
    return {
      width: (image.width * CANVAS_MAX_HEIGHT) / image.height,
      height: CANVAS_MAX_HEIGHT,
    };
  }
};
