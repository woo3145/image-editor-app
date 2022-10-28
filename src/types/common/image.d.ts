interface ImageSize {
  width: number;
  height: number;
}

type HistoryNodeType = 'load' | 'draw' | 'crop' | 'rotate';

interface ImageHistoryNode {
  image: HTMLImageElement;
  degree: number;
  type: HistoryNodeType;
}
