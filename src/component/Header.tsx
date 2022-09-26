const Header = () => {
  return (
    <header className="w-full py-4 border-b">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between">
        <p className="text-2xl text-blue-900 cursor-pointer">
          <b>Woo3145</b> Image Editor
        </p>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-blue-900 rounded-md cursor-pointer hover:bg-gray-100 duration-200">
            이미지 가져오기
          </div>
          <div className="px-4 py-2 bg-blue-900 rounded-md text-white cursor-pointer hover:bg-blue-800 duration-200">
            다운로드
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
