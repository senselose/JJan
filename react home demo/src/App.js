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
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BoardList from './components/BoardList';
// import BoardDetail from './components/BoardDetail';
// import BoardForm from './components/BoardForm';

// const App = () => {
//     const [selectedBoardId, setSelectedBoardId] = useState(null);

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<BoardList setSelectedBoardId={setSelectedBoardId} />} />
//                 <Route path="/boards/:id" element={<BoardDetail boardId={selectedBoardId} />} />
//                 <Route path="/new" element={<BoardForm />} />
//                 <Route path="/edit/:id" element={<BoardForm boardId={selectedBoardId} />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
// import BoardForm from './components/BoardForm';
import './App.css';
import BoardCreate from './components/BoadrCreate';

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              Board App
            </Typography>
            <Button color="inherit" component={Link} to="/boards">Board List</Button>
            <Button color="inherit" component={Link} to="/board-create">Board Create</Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Box my={4}>
            <Routes>
              <Route path="/" element={<BoardList />} />
              <Route path="/boards" element={<BoardList />} />
              <Route path="/board/:id" element={<BoardDetail />} />
              <Route path="/board-create" element={<BoardCreate />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
};

export default App;





// import React from "react";
// import BoardItem from "./components/BoardItem";
// import { laststBoardListMock } from "./mocks";
// function App() {
//   return (
//     <>
//     {laststBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
//     </>
//   );
// }

// export default App;
