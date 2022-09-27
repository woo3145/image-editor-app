import React from 'react';
import Controller from './component/Controller';
import Header from './component/Header';

function App() {
  return (
    <div className="font-light tracking-wider">
      <Header />
      <div className="max-w-screen-2xl mx-auto py-8">
        {/* Controller */}
        <Controller />
        {/* Image Editor */}
      </div>
    </div>
  );
}

export default App;
