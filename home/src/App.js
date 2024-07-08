import React from 'react';
import Carousel from './components/Carousel/Carousel';
// import SearchResultPage from './components/Header/SearchResultPage';
// import SearchPage from './components/Header/SearchPage';
import './App.css';
import Container from './layout/Container';
import {MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH} from './constant'
import Authentication from './views/Authentication';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './views/User';


// const App = () => {
//   return (
//     <Router>
//       <div>
//         <LoginHeader />
//         <Header />
        
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={
//               <>
//                 <Carousel />
//                 <h1>--</h1>
//                 <h2>메인 페이지 내용</h2>
//                 <p>이곳에 메인 페이지의 내용을 추가합니다.</p>
                
//               </>
//             } />
//             <Route path="/login" element={<LoginForm />} />

//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

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
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={MAIN_PATH()} element={<Carousel />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          {/* <Route path={SEARCH_PATH()} element={} /> */}
          <Route path={USER_PATH()} element={<User />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;