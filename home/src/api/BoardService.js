import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/board';

const getBoards = (page, size) => {
  return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
};

const getBoardById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

const createBoard = (board, image) => {
  const formData = new FormData();
  formData.append('board', new Blob([JSON.stringify(board)], { type: 'application/json' }));
  if (image) {
    formData.append('image', image);
  }
  return axios.post(API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateBoard = (id, board, image) => {
  const formData = new FormData();
  formData.append('board', new Blob([JSON.stringify(board)], { type: 'application/json' }));
  if (image) {
    formData.append('image', image);
  }
  return axios.put(`${API_BASE_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteBoard = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

const searchBoardsByTitle = (keyword, page, size) => {
  return axios.get(`${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`);
};

const getBoardsByCategory = (category, page, size) => {
  return axios.get(`${API_BASE_URL}/category`, {
    params: {
      category,
      page,
      size
    }
  });
};

const incrementViews = (id) => {
  return axios.post(`${API_BASE_URL}/increment-views/${id}`);
};

// 좋아요 기능 API
const likeBoard = (id) => {
  return axios.post(`${API_BASE_URL}/like/${id}`);
};

// 좋아요 취소 기능 API
const unlikeBoard = (id) => {
  return axios.post(`${API_BASE_URL}/unlike/${id}`);
};

const BoardService = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  searchBoardsByTitle,
  getBoardsByCategory,
  incrementViews,
  likeBoard,    // 추가된 메서드
  unlikeBoard   // 추가된 메서드
};

export default BoardService;
