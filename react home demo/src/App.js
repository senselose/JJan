import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginHead from './components/LoginHead/LoginHead';
import Header from './components/Header/Header';
import Carousel from './components/Carousel/Carousel';
import SearchResultPage from './components/Header/SearchResultPage';
import SearchPage from './components/Header/SearchPage';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <LoginHead />
        <Header />
        <Carousel />
        <div className="main-content">
          <h2>메인 페이지 내용</h2>
          <p>이곳에 메인 페이지의 내용을 추가합니다.</p>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
