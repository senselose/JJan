// src/api/CommentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/comments';

const createComment = (comment) => {
  return axios.post(API_BASE_URL, comment);
};

const getCommentsByBoardId = (boardId) => {
  return axios.get(`${API_BASE_URL}/board/${boardId}`);
};

const updateComment = (id, comment) => {
  return axios.put(`${API_BASE_URL}/${id}`, comment);
};

const deleteComment = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

const CommentService = {
  createComment,
  getCommentsByBoardId,
  updateComment,
  deleteComment,
};

export default CommentService;
