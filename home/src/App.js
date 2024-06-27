// import React from "react";
// import Category from "./Category";
// import Contents from "./Contents";
// import { useEffect } from "react";

// const App = () => {
//   return (
//     <>
//       <Category />
//       <Contents />
//       <useEffect />
//     </>
//   );
// };

// export default App;

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import './App.css';
import SEarchResultsPage from './components/SearchResultPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/search/:keyword" element={<SEarchResultsPage />} />
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;

