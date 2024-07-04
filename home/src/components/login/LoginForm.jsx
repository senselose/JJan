import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm ({ onLogin }) {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        axios.post('/login', { userId: userId, userPassword: userPassword })
            .then(response => {
                sessionStorage.setItem('userId', userId);
                onLogin();
                navigate('/loginSuccess'); // 로그인 성공 시
            })
            .catch(error => {
                setMessage('로그인 실패');
                navigate('/loginFail'); // 로그인 실패 시
            });
    }

    return (
        <div className="LoginForm">
            <h1>로그인</h1>
            <form onSubmit={handleLogin}>
                <label>
                    사용자 ID:
                    <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </label>
                <br/>
                <label>
                    비밀번호:
                    <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                </label>
                <br/>
                <button type="submit">로그인</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default LoginForm;