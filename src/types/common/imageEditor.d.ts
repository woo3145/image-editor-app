interface DragArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

type EditModeType = 'Crop' | 'Draw' | 'Rotate' | 'None';

type PenType = 'Free' | 'Straight';
