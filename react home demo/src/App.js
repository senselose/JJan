import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <div className="main-content">
        <h2>메인 페이지 내용</h2>
        <p>이곳에 메인 페이지의 내용을 추가합니다.</p>
      </div>
    </div>
  );
}

export default App;
