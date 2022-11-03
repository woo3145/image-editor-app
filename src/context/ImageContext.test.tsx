import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { SAMPLE_IMAGE1, SAMPLE_IMAGE2 } from '../constant';
import {
  ImageContextDispatch,
  ImageContextState,
  ImageProvider,
} from './ImageContext';

const TEST_IMGAE_URL1 = `http://test.com/${SAMPLE_IMAGE1}`;
const TEST_IMGAE_URL2 = `http://test.com/${SAMPLE_IMAGE2}`;

const setupRender = () => {
  const IMAGE_WIDTH = 200;
  const IMAGE_HEIGHT = 100;

  const TestComponent = () => {
    const { image, rootImage, imageSize, degree, history, historyIdx } =
      useContext(ImageContextState);
    const { initImage, addHistory, rotateRight, rotateLeft, redo, undo, skip } =
      useContext(ImageContextDispatch);

    const onClickInitImage = () => {
      const imageEl = new Image();
      imageEl.src = TEST_IMGAE_URL1;
      imageEl.width = IMAGE_WIDTH;
      imageEl.height = IMAGE_HEIGHT;
      initImage(imageEl);
    };
    const onClickAddImage = () => {
      const imageEl = new Image();
      imageEl.src = TEST_IMGAE_URL2;
      imageEl.width = IMAGE_WIDTH;
      imageEl.height = IMAGE_HEIGHT;
      addHistory(imageEl, 0, 'draw');
    };
    return (
      <>
        <img data-testid={'image'} src={image?.src} alt={image?.alt} />
        <img
          data-testid={'root_image'}
          src={rootImage?.src}
          alt={rootImage?.alt}
        />
        <div data-testid="degree">{degree}</div>
        <div data-testid={'image_size'}>
          {`${imageSize.width} | ${imageSize.height}`}
        </div>
        <ul data-testid="history">
          {history.map((node, idx) => {
            return (
              <li
                key={idx}
                data-testid={`history_node_${idx}`}
                onClick={() => skip(idx)}
              >
                {node.image.src} | {node.degree} | {node.type}
              </li>
            );
          })}
        </ul>
        <div data-testid="history_idx">{historyIdx}</div>
        <button data-testid={'init_image_button'} onClick={onClickInitImage}>
          init
        </button>
        <button data-testid={'add_history_button'} onClick={onClickAddImage}>
          add
        </button>
        <button data-testid={'rotate_left_button'} onClick={rotateLeft}>
          rotateLeft
        </button>
        <button data-testid={'rotate_right_button'} onClick={rotateRight}>
          rotateRight
        </button>
        <button data-testid={'redo_button'} onClick={redo}>
          redo
        </button>
        <button data-testid={'undo_button'} onClick={undo}>
          undo
        </button>
        <button
          data-testid={'test_expected_skip_button1'}
          onClick={() => skip(-2)}
        >
          skip -2
        </button>{' '}
        <button
          data-testid={'test_expected_skip_button2'}
          onClick={() => skip(100)}
        >
          skip 100
        </button>
      </>
    );
  };
  render(
    <ImageProvider>
      <TestComponent />
    </ImageProvider>
  );
  const CurrentImage = () => screen.getByTestId('image');
  const RootImage = () => screen.getByTestId('root_image');
  const Degree = () => screen.getByTestId('degree');
  const ImageSize = () => screen.getByTestId('image_size');
  const History = () => screen.getByTestId('history');
  const HistoryNode = (idx: number) =>
    screen.getByTestId(`history_node_${idx}`);
  const HistoryIdx = () => screen.getByTestId('history_idx');

  const InitImageButton = () => screen.getByTestId('init_image_button');
  const AddHistoryButton = () => screen.getByTestId('add_history_button');
  const RotateRightButton = () => screen.getByTestId('rotate_right_button');
  const RotateLeftButton = () => screen.getByTestId('rotate_left_button');
  const RedoButton = () => screen.getByTestId('redo_button');
  const UndoButton = () => screen.getByTestId('undo_button');

  const clickInitImageButton = () => userEvent.click(InitImageButton());
  const clickAddHistoryButton = () => userEvent.click(AddHistoryButton());
  const clickRotateRightButton = () => userEvent.click(RotateRightButton());
  const clickRotateLeftButton = () => userEvent.click(RotateLeftButton());
  const clickRedoButton = () => userEvent.click(RedoButton());
  const clickUndoButton = () => userEvent.click(UndoButton());
  const clickSkipButton = (idx: number) => userEvent.click(HistoryNode(idx));

  return {
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
    CurrentImage,
    RootImage,
    Degree,
    ImageSize,
    History,
    HistoryNode,
    HistoryIdx,
    clickInitImageButton,
    clickAddHistoryButton,
    clickRotateRightButton,
    clickRotateLeftButton,
    clickRedoButton,
    clickUndoButton,
    clickSkipButton,
  };
};

describe('<ImageContext />', () => {
  it('initImage, addHistory 기능', () => {
    const {
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
      CurrentImage,
      RootImage,
      Degree,
      ImageSize,
      HistoryNode,
      HistoryIdx,
      clickRedoButton,
      clickInitImageButton,
      clickAddHistoryButton,
      clickSkipButton,
    } = setupRender();
    // 초기 상태
    expect(RootImage().getAttribute('src')).toBe(null);
    expect(RootImage().getAttribute('alt')).toBe(null);
    expect(CurrentImage().getAttribute('src')).toBe(null);
    expect(CurrentImage().getAttribute('alt')).toBe(null);
    expect(Degree()).toHaveTextContent('0');
    expect(ImageSize()).toHaveTextContent('0 | 0');

    // init 상태
    clickInitImageButton();
    expect(RootImage().getAttribute('src')).toBe(TEST_IMGAE_URL1);
    expect(RootImage().getAttribute('alt')).toBe('image');
    expect(CurrentImage().getAttribute('src')).toBe(TEST_IMGAE_URL1);
    expect(CurrentImage().getAttribute('alt')).toBe('image');
    expect(Degree()).toHaveTextContent('0');
    expect(ImageSize()).toHaveTextContent(`${IMAGE_WIDTH} | ${IMAGE_HEIGHT}`);
    expect(HistoryNode(0)).toHaveTextContent(`${TEST_IMGAE_URL1} | 0 | load`);
    expect(HistoryIdx()).toHaveTextContent('0');

    // history add 상태
    clickAddHistoryButton();
    expect(RootImage().getAttribute('src')).toBe(TEST_IMGAE_URL1);
    expect(RootImage().getAttribute('alt')).toBe('image');
    expect(CurrentImage().getAttribute('src')).toBe(TEST_IMGAE_URL2);
    expect(CurrentImage().getAttribute('alt')).toBe('image');
    expect(ImageSize()).toHaveTextContent(`${IMAGE_WIDTH} | ${IMAGE_HEIGHT}`);
    expect(HistoryNode(1)).toHaveTextContent(`${TEST_IMGAE_URL2} | 0 | draw`);
    expect(HistoryIdx()).toHaveTextContent('1');

    // 히스토리 추가 후 과거시점으로 돌아가 새로 이미지를 추가하면 해당 시점을 기준으로 히스토리가 재생성 된다.
    clickAddHistoryButton();
    clickAddHistoryButton();
    expect(HistoryIdx()).toHaveTextContent('3');
    clickSkipButton(1);
    clickAddHistoryButton();
    expect(HistoryIdx()).toHaveTextContent('2');
    clickRedoButton();
    expect(HistoryIdx()).toHaveTextContent('2');
  });

  it('redo, undo, skip 기능', () => {
    const {
      HistoryIdx,
      clickInitImageButton,
      clickAddHistoryButton,
      clickRedoButton,
      clickUndoButton,
      clickSkipButton,
    } = setupRender();

    clickInitImageButton();
    clickAddHistoryButton();
    clickAddHistoryButton();
    expect(HistoryIdx()).toHaveTextContent('2');

    // 다음 히스토리가 없는데 redo가 실행된 경우
    clickRedoButton();
    expect(HistoryIdx()).toHaveTextContent('2');

    // redo, undo 정상 작동
    clickUndoButton();
    expect(HistoryIdx()).toHaveTextContent('1');
    clickRedoButton();
    expect(HistoryIdx()).toHaveTextContent('2');

    // 이전 히스토리가 없는데 undo가 실행된 경우
    clickUndoButton();
    clickUndoButton();
    clickUndoButton();
    expect(HistoryIdx()).toHaveTextContent('0');

    // skip 정상작동
    clickSkipButton(2);
    expect(HistoryIdx()).toHaveTextContent('2');
    clickSkipButton(1);
    expect(HistoryIdx()).toHaveTextContent('1');

    // skip에 히스토리 length 보다 큰수나 0보다 작은 수가 들어 갈 경우
    userEvent.click(screen.getByTestId('test_expected_skip_button1'));
    expect(HistoryIdx()).toHaveTextContent('1');
    userEvent.click(screen.getByTestId('test_expected_skip_button2'));
    expect(HistoryIdx()).toHaveTextContent('1');
  });

  it('rotate 기능', () => {
    const {
      HistoryIdx,
      HistoryNode,
      clickInitImageButton,
      clickRotateLeftButton,
      clickRotateRightButton,
    } = setupRender();

    // 이미지가 없는데 rotate를 실행하는 경우
    clickRotateRightButton();
    clickRotateLeftButton();
    expect(HistoryIdx()).toHaveTextContent('0');

    // init
    clickInitImageButton();

    // 기본 기능
    clickRotateRightButton();
    expect(HistoryNode(1)).toHaveTextContent(
      `${TEST_IMGAE_URL1} | 90 | rotate`
    );
    clickRotateLeftButton();
    expect(HistoryIdx()).toHaveTextContent('2');
    expect(HistoryNode(2)).toHaveTextContent(`${TEST_IMGAE_URL1} | 0 | rotate`);

    // 한쪽으로 4번 돌리면 다시 0도
    clickRotateRightButton();
    clickRotateRightButton();
    clickRotateRightButton();
    clickRotateRightButton();
    expect(HistoryIdx()).toHaveTextContent('6');
    expect(HistoryNode(6)).toHaveTextContent(`${TEST_IMGAE_URL1} | 0 | rotate`);

    clickRotateLeftButton();
    clickRotateLeftButton();
    clickRotateLeftButton();
    clickRotateLeftButton();
    expect(HistoryIdx()).toHaveTextContent('10');
    expect(HistoryNode(10)).toHaveTextContent(
      `${TEST_IMGAE_URL1} | 0 | rotate`
    );
  });
});
