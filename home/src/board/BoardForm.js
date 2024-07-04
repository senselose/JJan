import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../api/BoardService';
import { Container, TextField, Button, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './BoardForm.css';

const BoardForm = () => {
  const [board, setBoard] = useState({
    boardTitle: '',
    boardCategory: '',
    boardViews: 0,
    boardAuthor: '',
    boardContent: '',
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BoardService.createBoard(board, image)
      .then(() => {
        navigate('/boards', { state: { newBoard: true } });
      })
      .catch(error => {
        console.error('Error creating/updating board!', error);
      });
  };

  return (
    <Container>
      <Paper className="board-form-container">
        <Typography variant="h4" gutterBottom>새 게시글</Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="제목"
            name="boardTitle"
            value={board.boardTitle}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>카테고리</InputLabel>
            <Select
              name="boardCategory"
              value={board.boardCategory}
              onChange={handleChange}
            >
              <MenuItem value="자유 게시판">자유 게시판</MenuItem>
              <MenuItem value="나눔/장터 게시판">나눔/장터 게시판</MenuItem>
              <MenuItem value="정보 게시판">정보 게시판</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="작성자"
            name="boardAuthor"
            value={board.boardAuthor}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="내용"
            name="boardContent"
            value={board.boardContent}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
          />
          <Box my={2}>
            <input
              type="file"
              name="boardImage"
              onChange={handleImageChange}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">제출</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BoardForm;
