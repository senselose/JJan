// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState(''); // 'password'를 'userPassword'로 변경
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { userId, userPassword });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            alert('로그인 실패');
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
