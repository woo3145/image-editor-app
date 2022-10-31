import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import {
  ImageContextDispatch,
  ImageContextState,
  ImageProvider,
} from './ImageContext';

describe('<ImageContext />', () => {
  const IMAGE_WIDTH = 200;
  const IMAGE_HEIGHT = 100;
  const TestComponent = () => {
    const { image, imageSize, degree } = useContext(ImageContextState);
    const { setHistory, setHistoryIdx } = useContext(ImageContextDispatch);

    const setDefaultHistory = () => {
      if (!setHistory) return;
      const img = new Image();
      img.width = IMAGE_WIDTH;
      img.height = IMAGE_HEIGHT;
      img.src = 'http://test.com/test-src';
      img.alt = 'test-alt';
      setHistory([
        {
          image: img,
          degree: 0,
          type: 'load',
        },
        {
          image: img,
          degree: 90,
          type: 'rotate',
        },
      ]);
    };
    const nextImage = () => {
      if (!setHistoryIdx) return;
      setHistoryIdx(1);
    };

    return (
      <>
        <img data-testid={'image'} src={image?.src} alt={image?.alt} />
        <div data-testid="degree">{degree}</div>
        <div data-testid={'image-size'}>
          {imageSize ? `${imageSize.width} | ${imageSize.height}` : 'null'}
        </div>

        <button data-testid={'set-history'} onClick={setDefaultHistory}>
          road
        </button>
        <button data-testid={'next-image'} onClick={nextImage}>
          next
        </button>
      </>
    );
  };
  it('이미지의 degree가 변할경우 imageSize가 잘 변경되는가', () => {
    render(
      <ImageProvider>
        <TestComponent />
      </ImageProvider>
    );
    expect(screen.getByTestId('image').getAttribute('src')).toBe(null);
    expect(screen.getByTestId('image').getAttribute('alt')).toBe(null);
    expect(screen.getByTestId('degree')).toHaveTextContent('0');
    expect(screen.getByTestId('image-size')).toHaveTextContent('null');

    userEvent.click(screen.getByTestId('set-history'));
    expect(screen.getByTestId('image').getAttribute('src')).toBe(
      'http://test.com/test-src'
    );
    expect(screen.getByTestId('image').getAttribute('alt')).toBe('test-alt');
    expect(screen.getByTestId('degree')).toHaveTextContent('0');
    expect(screen.getByTestId('image-size')).toHaveTextContent(
      `${IMAGE_WIDTH} | ${IMAGE_HEIGHT}`
    );

    userEvent.click(screen.getByTestId('next-image'));
    expect(screen.getByTestId('degree')).toHaveTextContent('90');
    expect(screen.getByTestId('image-size')).toHaveTextContent(
      `${IMAGE_HEIGHT} | ${IMAGE_WIDTH}`
    );
  });
});
