## Image Editor App

#### 🚗 Road Map

- [x] 이미지를 가져와서 캔버스 크기에 맞게 비율 조정
- [x] Image Editor 에서 기능별 Layer로 구분 (Preview, Drag, Crop, ...)

  - 여기서 Image 상태 관리 (이미지, 이미지 사이즈)
  - 기능별 로직 분리 이점
  - 여러 기능을 가진 Layer가 추가 될 때 다른 레이어의 조작이 필요하거나 서브메뉴에서 각 레이어의 컨텍스트에 접근 해야함으로(ex. DrawLayer 펜 색상 변경) ContextAPI에 레이어 저장

- DragLayer

  - [x] 드래그 영역 저장 (ContextAPI 사용)

- CropLayer

  - [x] Layer 어둡게 처리 후 Drag 영역만 밝게 표시
  - [x] Crop Submenu UI (확인, 취소, 비율 지정)
    - [x] Crop 확인 시 Drag 영역을 ImageEditor 컴포넌트의 이미지 상태값에 저장함
    - [x] Crop 취소 시 CropMode 종료
    - [x] ++ 이미지가 캔버스 최대 사이즈보다 작을 때 수정필요

- DrawLayer

  - [x] DragArea의 offsetX, offsetY 기준으로 그림
  - [x] Draw Submenu UI (자유/직선, 색, 두께, 초기화) (Context API 사용)
  - [x] 자유선 (PreviewLayer에 바로 그림)
  - [x] 직선 (마우스를 땔때까지 직선의 경로가 정해진게 아님으로 DrawLayer에 미리 표시 후 마우스를 땔때 previewLayer에 그려줘야할듯)

- 이전, 이후로 되돌리기 기능 (이미지 히스토리 스택 구현 Context와 Hook 이용)

  - [x] Crop
  - [x] Draw

- [x] 이미지 가져오기 기능 (현재 샘플이미지)

- [x] Rotate 기능 (이미지 회전)

  - [x] Rotate 될때도 캔버스 최대사이즈에 비율 조절

- [x] 이미지 저장 기능

### Bugs

- [x] 1. 이미지 회전 후 draw시 이미지가 돌아감 (layer context에서 image변경 시 degree 초기화로 해결)
- [x] 2. 이미지 회전 후 history 저장안됨 (history에 degree추가, Image Layer Provider에서 degree 변경 시 history저장)
