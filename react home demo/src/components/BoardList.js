import React, { useEffect, useState, useCallback } from 'react';
import BoardService from '../api/BoardService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import {
  Container, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress,
  Box, Paper, TableContainer, TextField, Button, Grid, List, ListItem, ListItemText, Typography
} from '@mui/material';
import { Image } from '@mui/icons-material'; // 이미지 아이콘 import
import './BoardList.css';

const BoardList = () => {
  const [boards, setBoards] = useState([]); // 게시글 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const [selectedCategory, setSelectedCategory] = useState('전체 게시판'); // 선택된 카테고리
  const pageSize = 5; // 페이지 당 게시글 수
  const location = useLocation(); // 게시글 작성 후 첫 페이지로 이동하기 위해 location 사용
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

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
    BoardService.searchBoardsByTitle(keyword, page - 1, pageSize).then((response) => {
      setBoards(response.data.content); // 검색 결과를 설정
      setTotalPages(response.data.totalPages); // 총 페이지 수를 설정
      setLoading(false); // 로딩 상태를 false로 설정
    }).catch((error) => {
      console.error('검색 중 에러 발생!', error);
      setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
    });
  }, [keyword, page, pageSize]);

  // Enter 키를 눌렀을 때 검색을 실행하는 함수
  const onSearchWordKeyDownHandler = (event) => {
    if (event.key !== 'Enter') return;
    handleSearch();
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1); // 카테고리 선택 시 페이지를 1로 설정
    if (category === '전체 게시판') {
      fetchBoards(); // 전체 게시판 선택 시 모든 게시글 가져오기
    } else {
      fetchBoardsByCategory(category); // 선택된 카테고리에 따라 게시글 목록을 가져옴
    }
  };

  // 컴포넌트가 마운트될 때 게시글 데이터를 가져옴
  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
      if (location.state.category === '전체 게시판') {
        fetchBoards();
      } else {
        fetchBoardsByCategory(location.state.category);
      }
    } else {
      fetchBoards();
    }
  }, [fetchBoards, fetchBoardsByCategory, location.state]);

  // 페이지가 변경될 때마다 페이지 번호를 업데이트
  useEffect(() => {
    if (location.state && location.state.newBoard) {
      setPage(1); // 새 게시글 작성 시 페이지를 1로 설정
    }
  }, [location]);

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
    navigate('/create-board');
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

  return (
    <Container className="board-list-container"> {/* Container를 사용하여 전체 컨테이너를 감싸고 className을 통해 스타일을 적용합니다. */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
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
        </Grid>
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box className="loading-box">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="search-box">
                <TextField
                  label="제목으로 검색"
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
                >
                  검색
                </Button>
              </Box>
              <TableContainer component={Paper}>
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
                            <Link to="#" onClick={() => handleCategorySelect(board.boardCategory)}>
                              {board.boardCategory}
                            </Link>
                          </TableCell>
                        ) : (
                          <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                        )}
                        <TableCell>
                          <Link to="#" onClick={() => handleBoardClick(board.boardSeq)}>
                            [{getCategoryAbbreviation(board.boardCategory)}] {board.boardTitle}
                            {board.boardImage && <Image className="icon image-icon" />} {/* 이미지 아이콘 추가 */}
                            {board.commentCount > 0 && (
                              <span style={{ marginLeft: 8 }}>
                                ({board.commentCount})
                              </span>
                            )} {/* 댓글 수 표시 */}
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
              <Box className="pagination-container">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreate}
                  className="create-button"
                >
                  게시글 작성
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardList;
