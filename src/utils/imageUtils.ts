const CANVAS_MAX_WIDTH = 800;
const CANVAS_MAX_HEIGHT = 600;

// 캔버스 최대 크기 값에 이미지 비율을 조정해주는 함수
export const resizeImage = (
  image: HTMLImageElement
): { width: number; height: number } => {
  if (image.width > image.height) {
    // 가로 이미지
    const width =
      image.width < CANVAS_MAX_WIDTH ? image.width : CANVAS_MAX_WIDTH;

    return {
      width: width,
      height: (image.height * width) / image.width,
    };
  } else {
    // 세로 이미지

    const height =
      image.height < CANVAS_MAX_HEIGHT ? image.height : CANVAS_MAX_HEIGHT;
    return {
      width: (image.width * height) / image.height,
      height: height,
    };
  }
};
