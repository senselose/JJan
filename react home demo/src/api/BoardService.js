import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/boards';

const getBoards = (page, size) => {
  return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
};

const getBoardById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

// 게시글 생성 메서드
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

// 수정 메서드
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

// 삭제 메서드
const deleteBoard = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

// 제목으로 검색 메서드
const searchBoardsByTitle = (keyword, page, size) => {
  return axios.get(`${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`);
};

// 카테고리별 게시글 가져오기 메서드 추가
const getBoardsByCategory = (category, page, size) => {
  return axios.get(`${API_BASE_URL}/category`, {
    params: {
      category: category,
      page: page,
      size: size
    }
  });
};

// 조회수 증가 메서드 추가
const incrementViews = (id) => {
  return axios.post(`${API_BASE_URL}/increment-views/${id}`);
}

const BoardService = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  searchBoardsByTitle,
  getBoardsByCategory,  // 추가된 메서드
  incrementViews,
};

export default BoardService;
