import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState(''); // 변수명 변경: setuserPassword -> setUserPassword
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { userId, userPassword });
            localStorage.setItem('jwtToken', response.data.token); // 로컬 스토리지 키 이름을 통일
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error); // 콘솔에 오류 출력
            alert('로그인 실패: ' + (error.response ? error.response.data.message : '서버와의 통신에 실패했습니다.'));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" />
            <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="비밀번호" />
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
