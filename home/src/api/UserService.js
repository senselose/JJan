import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

const checkVerificationStatus = (email) => {
  return axios.post(`${API_BASE_URL}/checkVerificationStatus`, { email });
};

const register = (user) => {
  return axios.post(`${API_BASE_URL}/register`, user);
};

const sendVerificationCode = (email, provider) => {
  return axios.post(`${API_BASE_URL}/sendVerificationCode`, { email, provider });
};

const verifyCode = (email, code) => {
  return axios.post(`${API_BASE_URL}/verifyCode`, { email, code });
};

const checkUserId = (userId) => {
  return axios.get(`${API_BASE_URL}/checkUserId`, { params: { userId } });
};

const checkUserNickName = (userNickName) => {
  return axios.get(`${API_BASE_URL}/checkUserNickName`, { params: { userNickName } });
};

const login = (userId, userPassword) => {
  return axios.post(`${API_BASE_URL}/login`, { userId, userPassword });
};

const UserService = {
  checkVerificationStatus,
  register,
  sendVerificationCode,
  verifyCode,
  checkUserId,
  checkUserNickName,
  login,
};

export default UserService;
