import React from 'react';
import './LoginHead.css';
import { Link } from 'react-router-dom';

const LoginHead = () => {
    return (
        <div className="loginHead">
            <p>로그인 | 회 sssssssq원가입</p>
            <h4 className="main-title"><a href="index.html">주 주 총 회</a></h4>
            <div className="right-section">
                <p><Link to="/login">로그인</Link></p>
                <p>|</p>
                <p><a href="#">회원가입</a></p>
            </div>
        </div>
    );
}

export default LoginHead;
