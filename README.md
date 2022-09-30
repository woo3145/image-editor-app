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
    - [ ] Crop 확인 시 Drag 영역을 ImageEditor 컴포넌트의 이미지 상태값에 저장함
    - [ ] Crop 취소 시 CropMode 종료

- DrawLayer

  - 여기에선 Preview Layer에 바로 그려주고 기능만 구현
  - [ ] DragArea의 width와 height를 기준으로 그림
  - [ ] Draw Submenu UI (펜/지우개, 색, 두께, 초기화) (ContextAPI 사용해야함)
  - [ ] 한번의 드로잉 단위로 되돌리기 (Canvas API - save, restore)
    - DragArea의 x,y 가 변경 될 때 save

- [ ] 이미지 가져오기 기능 (현재 샘플이미지)

- [ ] Rotate 기능 (이미지 회전)

- [ ] 이미지 저장 기능
