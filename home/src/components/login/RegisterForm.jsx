import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';

function RegisterForm() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userNickName, setUserNickName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDomain, setUserDomain] = useState('gmail.com');
    const [userBirth, setUserBirth] = useState('');
    const [userPhoneNum1, setUserPhoneNum1] =useState('');
    const [userPhoneNum2, setUserPhoneNum2] =useState('');
    const [userPhoneNum3, setUserPhoneNum3] =useState('');
    const [enteredVerificationCode, setEnteredVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const userPhoneNum = `${userPhoneNum1}-${userPhoneNum2}-${userPhoneNum3}`;
        const fullEmail = `${userEmail}@${userDomain}`;
    
    // 이메일 인증이 완료되었는지 확인
    axios.post('/api/auth/checkVerificationStatus', { email: fullEmail})
        .then(response => {
            if(!response.data.isVerified) {
                setEmailError('이메일 인증을 완료해야 합니다.')
                return;
            }
        
        // 이메일 인증이 완료되었을 때만 회원가입 요청
        axios.post('/api/auth/register', {
            userId: parseInt(userId, 10),
            userName,
            userNickName,
            userPassword,
            userEmail: fullEmail,
            userDomain,
            userBirth,
            userPhoneNum
        })
        .then(response => {
            setPopupMessage('회원가입 성공');
            setShowPopup(true);
            setTimeout(() => {
                navigate('/');
            }, 3000) // 3초 후에 인덱스 페이지로 이동
        })
        .catch(error => {
            setPopupMessage('회원가입 실패');
            setShowPopup(true);
        });
    })
    .catch(error => {
        setPopupMessage('이메일 인증 상태 확인 중 오류가 발생했습니다.');
        setShowPopup(true);
    });
};    
    const sendVerificationCode = () => {
        const fullEmail = `${userEmail}@${userDomain}`;
        const provider = userDomain.includes("naver") ? "naver" : "google";

        axios.post('api/auth/sendVerificationCode', {email: fullEmail, provider: provider})
            .then(response => {
                setPopupMessage('인증번호가 이메일로 전송되었습니다.');
                setShowPopup(true);
               
            })
            .catch(error => {
                setPopupMessage('인증번호 전송에 실패했습니다.');
                setShowPopup(true);
            });
    };

    const verifyCode = () => {
        const fullEmail = `${userEmail}@${userDomain}`;
        axios.post('api/auth/verifyCode', { email: fullEmail, code: enteredVerificationCode })
            .then(response => {
                if (response.data.isValid) {
                    setPopupMessage('이메일 인증 성공');
                    setShowPopup(true);
                } else {
                    setPopupMessage('이메일 인증번호가 일치하지 않습니다.');
                    setShowPopup(true);
                }
            })
            .catch(error => {
                setPopupMessage('이메일 인증 중 오류가 발생했습니다.');
                setShowPopup(true);
            });
    };

    const checkUserId = () => {
        axios.get('/api/auth/checkUserId', { params: { userId } })
            .then(response => {
                if (response.data.exists) {
                    setMessage('아이디가 이미 존재합니다.');
                } else {
                    setMessage('아이디를 사용할 수 있습니다.');
                }
            })
            .catch(error => {
                setMessage('아이디 중복 확인 중 오류가 발생했습니다.')
            });
    };

    const checkUserNickName = () => {
        axios.get('api/auth/checkUserNickName', { params: { userNickName } })
            .then(response => {
                if(response.data.exists) {
                    setMessage('닉네임이 이미 존재합니다.');
                } else {
                    setMessage('닉네임을 사용할 수 있습니다.');
                }
            })
            .catch(error => {
                setMessage('닉네임 중복 확인 중 오류가 발생했습니다.');
            });
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="RegisterForm">
            <h1>회원가입</h1>
            <form onSubmit={handleRegister}>
                <label>
                    아이디:
                    <input type="text" value={userId} onChange={e => setUserId(e.target.value)}/>
                    <button type="button" onClick={checkUserId}>중복확인</button>
                </label>
                <br/>
                <label>
                    이름:
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    닉네임:
                    <input type="text" value={userNickName} onChange={e => setUserNickName(e.target.value)}/>
                    <button type="button" onClick={checkUserNickName}>중복확인</button>
                </label>
                <br/>
                <label>
                    비밀번호:
                    <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
                </label>
                <br/>
                <label>
                    이메일:
                    <input 
                        type="text"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="유효한 이메일 주소를 입력하세요."
                        /> @
                    <select value={userDomain} onChange={e => setUserDomain(e.target.value)}>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                    </select>
                    <button type="button" onClick={sendVerificationCode}>인증코드 발송</button>
                </label>
                <br/>
                <label>
                    인증코드:
                    <input type="text" value={enteredVerificationCode} onChange={e => setEnteredVerificationCode(e.target.value)}/>
                    <button type="button" onClick={verifyCode}>인증코드 확인</button>
                </label>
                <br/>
                {emailError && <p classname="error">{emailError}</p>}
                <label> 
                    생년월일:
                    <input type="date" value={userBirth} onChange={e => setUserBirth(e.target.value)}/>
                </label>
                <br/>
                <label>
                    전화번호:
                    <input type="text" value={userPhoneNum1} onChange={e => setUserPhoneNum1(e.target.value)}/> -
                    <input type="text" value={userPhoneNum2} onChange={e => setUserPhoneNum2(e.target.value)}/> -
                    <input type="text" value={userPhoneNum3} onChange={e => setUserPhoneNum3(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">회원가입</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h1>{popupMessage}</h1>
                        <button onClick={closePopup}>팝업 닫기</button>
                    </div>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
}

export default RegisterForm;