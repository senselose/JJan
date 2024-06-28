import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    getBoards(page, size) {
        return axios.get(`${BOARD_API_BASE_URL}?page=${page}&size=${size}`);
    }
}

const boardServiceInstance = new BoardService();  // 인스턴스를 변수에 할당합니다.

export default boardServiceInstance;  // 변수를 기본 내보내기로 사용합니다.
