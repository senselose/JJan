import React, { useEffect, useState, useCallback } from 'react';
import BoardService from '../../api/BoardService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import {
  Container, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress,
  Box, Paper, TableContainer, TextField, Button, Grid, List, ListItem, ListItemText, Typography,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Image } from '@mui/icons-material'; // 이미지 아이콘 import
import './BoardList.css';

const BoardList = () => {
  const [boards, setBoards] = useState([]); // 게시글 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const [searchOption, setSearchOption] = useState('title'); // 검색 옵션
  const [selectedCategory, setSelectedCategory] = useState('전체 게시판'); // 선택된 카테고리
  const pageSize = 15; // 페이지 당 게시글 수
  const location = useLocation(); // 게시글 작성 후 첫 페이지로 이동하기 위해 location 사용
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

  useEffect(() => {
    const handleScroll = () => {
      const boardList = document.querySelector('.board-list');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const boardListHeight = boardList.offsetHeight;

      if (scrollTop + windowHeight / 2 > boardListHeight / 2) {
        boardList.style.top = `${scrollTop + windowHeight / 2 - boardListHeight / 2}px`;
      } else {
        boardList.style.top = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 게시글 데이터를 가져오는 함수
  const fetchBoards = useCallback(() => {
    setLoading(true); // 로딩 상태를 true로 설정
    BoardService.getBoards(page - 1, pageSize).then((response) => {
      setBoards(response.data.content); // 게시글 데이터를 설정
      setTotalPages(response.data.totalPages); // 총 페이지 수를 설정
      setLoading(false); // 로딩 상태를 false로 설정
    }).catch((error) => {
      console.error('게시글 데이터를 불러오는 중 에러 발생!', error);
      setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
    });
  }, [page]);

  // 선택된 카테고리에 따른 게시글 데이터를 가져오는 함수
  const fetchBoardsByCategory = useCallback((category) => {
    setLoading(true); // 로딩 상태를 true로 설정
    BoardService.getBoardsByCategory(category, page - 1, pageSize).then((response) => {
      setBoards(response.data.content); // 게시글 데이터를 설정
      setTotalPages(response.data.totalPages); // 총 페이지 수를 설정
      setLoading(false); // 로딩 상태를 false로 설정
    }).catch((error) => {
      console.error('카테고리별 게시글 데이터를 불러오는 중 에러 발생!', error);
      setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
    });
  }, [page]);

  // 검색 핸들러
  const handleSearch = useCallback(() => {
    setLoading(true); // 로딩 상태를 true로 설정
    if (searchOption === 'title') {
      BoardService.searchBoardsByTitle(keyword, page - 1, pageSize).then((response) => {
        setBoards(response.data.content); // 검색 결과를 설정
        setTotalPages(response.data.totalPages); // 총 페이지 수를 설정
        setLoading(false); // 로딩 상태를 false로 설정
      }).catch((error) => {
        console.error('검색 중 에러 발생!', error);
        setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
      });
    } else {
      BoardService.searchBoardsByTitleAndContent(keyword, page - 1, pageSize).then((response) => {
        setBoards(response.data.content); // 검색 결과를 설정
        setTotalPages(response.data.totalPages); // 총 페이지 수를 설정
        setLoading(false); // 로딩 상태를 false로 설정
      }).catch((error) => {
        console.error('검색 중 에러 발생!', error);
        setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
      });
    }
  }, [keyword, page, pageSize, searchOption]);

  // Enter 키를 눌렀을 때 검색을 실행하는 함수
  const onSearchWordKeyDownHandler = (event) => {
    if (event.key !== 'Enter') return;
    handleSearch();
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 선택 시 페이지를 1로 설정
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 게시글 클릭 핸들러
  const handleBoardClick = (boardSeq) => {
    BoardService.incrementViews(boardSeq)
      .then(() => {
        navigate(`/board/${boardSeq}`, { state: { category: selectedCategory } });
      })
      .catch(error => {
        console.error('조회수 증가 중 에러 발생!', error);
        navigate(`/board/${boardSeq}`, { state: { category: selectedCategory } }); // 에러가 발생해도 상세 페이지로 이동
      });
  };

  // 게시글 생성 페이지로 이동
  const handleCreate = () => {
    navigate('/board-create');
  };

  // 카테고리 앞글자만 가져오는 함수
  const getCategoryAbbreviation = (category) => {
    switch (category) {
      case '자유 게시판':
        return '자유';
      case '나눔 게시판':
        return '나눔';
      case '장터 게시판':
        return '장터';
      case '정보 게시판':
        return '정보';
      default:
        return category;
    }
  };

  // 카테고리 또는 페이지가 변경될 때마다 게시글을 다시 가져오는 useEffect
  useEffect(() => {
    if (selectedCategory === '전체 게시판') {
      fetchBoards();
    } else {
      fetchBoardsByCategory(selectedCategory);
    }
  }, [fetchBoards, fetchBoardsByCategory, selectedCategory, page]);

  // 새 게시글 작성 후 페이지를 1로 설정하는 useEffect
  useEffect(() => {
    if (location.state && location.state.newBoard) {
      setPage(1); // 새 게시글 작성 시 페이지를 1로 설정
    }
  }, [location]);

  return (
    <Box display="flex" className="board-list-container">
      <Box className="board-list">
        <Paper>
          <Typography variant="h6" style={{ padding: '14px' }}>게시판 목록</Typography>
          <List>
            {['전체 게시판', '자유 게시판', '나눔 게시판', '장터 게시판', '정보 게시판'].map((text) => (
              <ListItem button key={text} onClick={() => handleCategorySelect(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Container className="board-content" maxWidth={false} disableGutters>
        <Grid container spacing={10}>
          <Grid item xs={20}>
            <Box mt={2}>
              <Typography variant="h5">{selectedCategory}</Typography>
            </Box>
            {loading ? (
              <Box className="loading-box">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer component={Paper} className="table-container">
                  <Table className="board-table">
                    <TableHead className="board-table-header">
                      <TableRow>
                        {selectedCategory === '전체 게시판' ? (
                          <TableCell style={{ width: '20%' }}></TableCell>
                        ) : (
                          <TableCell>번호</TableCell>
                        )}
                        <TableCell>제목</TableCell>
                        <TableCell>작성자</TableCell>
                        <TableCell>작성일</TableCell>
                        <TableCell>조회수</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {boards.map((board, index) => (
                        <TableRow key={board.boardSeq}>
                          {selectedCategory === '전체 게시판' ? (
                            <TableCell>
                              <Link to="#" onClick={() => handleCategorySelect(board.boardCategory)} className="category-link">
                                {board.boardCategory}
                              </Link>
                            </TableCell>
                          ) : (
                            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                          )}
                          <TableCell>
                            <Link to="#" onClick={() => handleBoardClick(board.boardSeq)} className="board-link">
                              <Box className="board-title-container">
                                [{getCategoryAbbreviation(board.boardCategory)}] {board.boardTitle}
                                {board.boardImage && <Image className="icon image-icon" />}
                                {board.commentCount > 0 && (
                                  <span className="comment-count">
                                    ({board.commentCount})
                                  </span>
                                )}
                              </Box>
                            </Link>
                          </TableCell>
                          <TableCell>{board.boardAuthor}</TableCell>
                          <TableCell>{new Date(board.boardDate).toLocaleDateString()}</TableCell>
                          <TableCell>{board.boardViews}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box className="pagination-create-container">
                  <Box className="pagination-container">
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                  <Box className="create-button-container">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCreate}
                      className="create-button"
                      style={{ marginLeft: '10px' }}
                    >
                      게시글 작성
                    </Button>
                  </Box>
                </Box>
                <Box className="search-box" mt={2}>
                  <FormControl variant="outlined" style={{ minWidth: '150px', marginRight: '8px' }}>
                    <InputLabel>검색 옵션</InputLabel>
                    <Select
                      value={searchOption}
                      onChange={(e) => setSearchOption(e.target.value)}
                      label="검색 옵션"
                    >
                      <MenuItem value="title">제목</MenuItem>
                      <MenuItem value="title+content">제목+내용</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="검색어"
                    variant="outlined"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={onSearchWordKeyDownHandler} // Enter 키 핸들러 추가
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    style={{ marginLeft: '8px' }}
                  >
                    검색
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BoardList;
