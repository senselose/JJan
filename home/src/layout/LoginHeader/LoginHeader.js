import React from 'react';
import './LoginHeader.css';
import { Link } from 'react-router-dom';
import {AUTH_PATH} from '../../constant'

const LoginHeader = () => {
    return (
        <div className="loginHeader">
            <p>로그인</p>
            <h4 className="main-title"><a href="index.html">주 주 총 회</a></h4>
            <div className="right-section">
                <div className='right-section-login'><Link to={AUTH_PATH()}><span>로그인</span></Link></div>
                {/* <p>|</p>
                <p><a href="#">회원가입</a></p> */}
            </div>
        </div>
    );
}

export default LoginHeader;
