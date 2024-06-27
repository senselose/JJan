import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Carousel from './components/Carousel';
import SearchResultPage from './components/SearchResultPage';
import SearchPage from './components/SearchPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Carousel />
        <div className="main-content">
          
        </div>
      </div>
    </Router>
  );
}

export default App;
