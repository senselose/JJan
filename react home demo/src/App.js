// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Carousel from './components/Carousel';
// import './App.css';

// import SearchComponent from './components/SearchComponent';
// import SearchResultPage from './components/SearchResultPage';
// import BoardList from './components/BoardList';
// import CreatePost from './components/CreateBoard';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* <Header />
//         <Carousel /> */}
//         {/* <BoardList /> */}
//         <Routes>
//         <Route path="/search/:keyword" element={<SearchResultPage />} />
//         <Route path="/" element={<BoardList />} />
//         <Route path="/create" element={<CreatePost />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// ------------------------------------------------------------------------

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardList from './components/BoardList';
import CreateBoard from './components/CreateBoard';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/create" element={<CreateBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

