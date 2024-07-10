import React, { useState, useEffect } from 'react';
import Carousel from './components/Carousel/Carousel';
// import SearchResultPage from './components/Header/SearchResultPage';
// import SearchPage from './components/Header/SearchPage';
import './App.css';
import Container from './layout/Container';
//import {MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH} from './constant'
import Authentication from './views/Authentication';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './views/User';
import BoardList from './components/board/BoardList';
import RegisterForm from './components/login/RegisterForm';
import LoginForm from './components/login/LoginForm';
import BoardDetail from './components/board/BoardDetail'; 
import LoginSuccess from './components/login/LoginSuccess';
import LoginFail from './components/login/LoginFail';
// import LoginHeader from './layout/LoginHeader/LoginHeader';
import BoardCreate from './components/board/BoardCreate';
import WhiskyEvents from './components/WhiskyEvent/WhiskyEvents';
import MyPage from './components/mypage/MyPage';
import {MAIN_PATH, AUTH_PATH, USER_PATH} from './constant'
import BoardCreate from './components/board/BoardCreate';
import ProtectedRoute from './stores/ProtectRoute';
import BoardUpdate from './components/board/BoardUpdate';
// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
// import BoardList from './components/board/BoardList';
// import BoardDetail from './components/board/BoardDetail';
// // import BoardForm from './components/BoardForm';
// import './App.css';
// import BoardCreate from './components/board/BoardCreate';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" className="title">
//               Board App
//             </Typography>
//             <Button color="inherit" component={Link} to="/boards">Board List</Button>
//             <Button color="inherit" component={Link} to="/board-create">Board Create</Button>
//           </Toolbar>
//         </AppBar>
//         <Container>
//           <Box my={4}>
//             <Routes>
//               <Route path="/boards" element={<BoardList />} />
//               <Route path="/board/:id" element={<BoardDetail />} />
//               <Route path="/board-create" element={<BoardCreate />} />
//             </Routes>
//           </Box>
//         </Container>
//       </div>
//     </Router>
//   );
// };

// export default App;


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Container isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/board' element={<BoardList />} />
          <Route path='/board/:category' element={<BoardList />} />
          <Route path='/board/write' element={<BoardCreate />} />
          <Route path='/board/detail/:id' element={<BoardDetail />} />
          <Route path='/loginsucess' element={<LoginSuccess />} />
          <Route path='/loginfail' element={<LoginFail />} />
          <Route path={MAIN_PATH()} element={<Carousel />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={USER_PATH()} element={<User />} />
          <Route path='/whisky/events' element={<WhiskyEvents />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path='/board/write' element={<BoardCreate />} />
          <Route path='/board' element={<BoardList />} />
          <Route path='/board/:category' element={<BoardList />} />
          <Route path="/board/detail/:seq" element={<BoardDetail />} /> 
          <Route path='/board/update/:seq' element={<BoardUpdate />} />
        </Routes>
      </Container>
    </BrowserRouter>



  );
}

export default App;