import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import BoardService from '../api/BoardService';
import CommentService from '../api/CommentService';
import { Container, Paper, Typography, Button, Box, CircularProgress, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './BoardDetail.css';

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  // 게시글 데이터를 가져오는 함수
  const fetchBoard = useCallback(async () => {
    try {
      const response = await BoardService.getBoardById(id);
      setBoard(response.data);
      setLoading(false);

      // 조회수 증가 함수 호출
      await BoardService.incrementViewCount(id);
    } catch (error) {
      console.error('Error fetching the board data!', error);
      setLoading(false);
    }
  }, [id]);

  // 댓글 데이터를 가져오는 함수
  const fetchComments = useCallback(async () => {
    try {
      const response = await CommentService.getCommentsByBoardId(id);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments!', error);
    }
  }, [id]);

  // 게시글과 댓글 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchBoard();
    fetchComments();
  }, [fetchBoard, fetchComments]);

  // 게시글 삭제 함수
  const handleDeleteBoard = () => {
    BoardService.deleteBoard(id)
      .then(() => {
        navigate('/boards', { state: { category: location.state?.category } });
      })
      .catch(error => {
        console.error('Error deleting board!', error);
      });
  };

  // 댓글 생성 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      commentContent: newComment,
      commentAuthor: "Anonymous", // 수정 필요
      board: { boardSeq: id },
    };
    CommentService.createComment(comment)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch(error => {
        console.error('Error creating comment!', error);
      });
  };

  // 댓글 수정 시작 함수
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentSeq);
    setEditingCommentContent(comment.commentContent);
  };

  // 댓글 수정 제출 함수
  const handleUpdateComment = (e) => {
    e.preventDefault();
    CommentService.updateComment(editingCommentId, { commentContent: editingCommentContent })
      .then(response => {
        setComments(comments.map(comment => comment.commentSeq === editingCommentId ? response.data : comment));
        setEditingCommentId(null);
        setEditingCommentContent("");
      })
      .catch(error => {
        console.error('Error updating comment!', error);
      });
  };

  // 댓글 삭제 함수
  const handleDeleteComment = (id) => {
    CommentService.deleteComment(id)
      .then(() => {
        setComments(comments.filter(comment => comment.commentSeq !== id));
      })
      .catch(error => {
        console.error('Error deleting comment!', error);
      });
  };

  if (loading) {
    return <Box className="loading-box"><CircularProgress /></Box>;
  }

  return (
    <Container>
      <Paper className="board-detail-container">
        <Typography variant="h6" color="textSecondary">{board.boardCategory}</Typography> {/* 카테고리 추가 */}
        <Typography variant="h4" gutterBottom>{board.boardTitle}</Typography>
        {board.boardImage && (
          <img src={`http://localhost:8080${board.boardImage}`} alt={board.boardTitle} className="board-detail-image" />
        )}
        <Typography variant="body1" gutterBottom>{board.boardContent}</Typography>
        <Typography variant="body2" color="textSecondary">{`Author: ${board.boardAuthor} | Date: ${new Date(board.boardDate).toLocaleDateString()} | Views: ${board.boardViews}`}</Typography>
        <Button variant="contained" color="primary" component={Link} to="/boards" state={{ category: location.state?.category }}>Back to Board List</Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteBoard}>Delete</Button>
      </Paper>

      <Paper className="comments-container">
        <Typography variant="h5" gutterBottom>댓글</Typography>
        {comments.map(comment => (
          <Box key={comment.commentSeq} className="comment">
            {editingCommentId === comment.commentSeq ? (
              <form onSubmit={handleUpdateComment} className="comment-form">
                <TextField
                  label="Edit Comment"
                  variant="outlined"
                  value={editingCommentContent}
                  onChange={(e) => setEditingCommentContent(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
                <Button type="submit" variant="contained" color="primary">Update</Button>
              </form>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary">{comment.commentAuthor}</Typography>
                <Typography variant="body1">{comment.commentContent}</Typography>
                <Typography variant="body2" color="textSecondary">{new Date(comment.commentDate).toLocaleString()}</Typography>
                <IconButton onClick={() => handleEditComment(comment)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteComment(comment.commentSeq)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        ))}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <TextField
            label="New Comment"
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BoardDetail;
