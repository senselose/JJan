import React from 'react';
import './LoginHeader.css';
import { Link } from 'react-router-dom';

const LoginHeader = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <div className="loginHeader">
            <h4 className="main-title"><Link to="/">주 주 총 회</Link></h4>
            <div className="right-section">
                {isLoggedIn ? (
                    <>
                        <div className='right-section-login'><Link to="/mypage"><span>마이페이지</span></Link></div>
                        <p>|</p>
                        <p onClick={handleLogout}>로그아웃</p>
                    </>
                ) : (
                    <>
                        <div className='right-section-login'><Link to="/login"><span>로그인</span></Link></div>
                        <p>|</p>
                        <p><Link to="/register">회원가입</Link></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginHeader;
