import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import InputBox from '../../components/InputBox';
//import { signInRequest, signUpRequest } from 'apis';
import { useCookies } from 'react-cookie';
import {MAIN_PATH} from '../../constant'
import { useNavigate } from 'react-router-dom';

//          components: 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태            //
  const [view, setView] = useState('sign-in');

  //          state: 쿠키 상태            //
  const [cookies, setCookie] = useCookies();

  //          function: 네비게이트 함수            //
  const navigator = useNavigate();

  //          components: sign in card 컴포넌트          //
  const SignInCard = () => {

    //          state: 아이디 요소 참조 상태            //
    const idRef = useRef(null);

    //          state: 패스워드 요소 참조 상태            //
    const passwordRef = useRef(null);
    
    //          state: 아이디 상태            //
    const [id, setId] = useState('');

    //          state: 패스워드 상태            //
    const [password, setPassword] = useState('');

    //          state: 패스워드 타입 상태            //
    const [passwordType, setPasswordType] = useState('password');
    
    //          state: 패스워드 버튼 아이콘 상태            //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState('eye-light-off-icon');

    //          state: 에러 상태            //
    const [error, setError] = useState(false);

    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody) => {
      if (!responseBody) {
        alert('네트워크 상태를 확인해주세요.');
        return;
      }
      const {code} = responseBody;
      // 데이터베이스 오류일 경우
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      // 로그인 실패(SF)나 유효성검사 오류(VF) 일 때
      if (code === 'SF' || code === 'VF') setError(true);
      // 로그인 성공(SU)이 아니면 종료
      if (code !== 'SU') return;

      // 로그인 성공시 처리
      const {token, expirationTime} = responseBody;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      // 쿠키 설정
      setCookie('accessToken', token, { expires, path: MAIN_PATH() });
      // 페이지 이동
      navigator(MAIN_PATH());
    }

    //          event handler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event) => {
      setError(false);
      const {value} = event.target;
      setId(value);
    }

    //          event handler: 비밀번호 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event) => {
      setError(false);
      const {value} = event.target;
      setPassword(value);
    }

    //          event handler: 로그인 버튼 클릭 이벤트 처리          //
    const onSignInButtonClickHandler = () => {
      const requestBody = {id, password};
      //signInRequest(requestBody).then(signInResponse);
    }

    //          event handler: 회원가입 링크 클릭 이벤트 처리          //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up'); 
    }
    
    //          event handler: 패스워드 버튼 클릭 이벤트 처리          //
    const onPasswordButtonClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      } else {
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    }

    //          event handler: 아이디 input 키 다운 이벤트 처리          //
    const onIdKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }
    
    //          event handler: 패스워드 input 키 다운 이벤트 처리          //
    const onPasswordKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    //          render: sign in card 컴포넌트 렌더링          //
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={idRef} label='이메일' type='text' placeholder='이메일를 입력해주세요.' error={error} value={id} onChange={onEmailChangeHandler} onKeyDown={onIdKeyDownHandler} />
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
              </div>
            </div>
            }
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  //          components: sign up card 컴포넌트          //
  const SignUpCard = () => {

    // 각 입력 필드를 참조하기 위한 useRef 선언

    //          state: 이메일 요소 참조 상태         //
    const emailRef = useRef(null);

    //          state: 비밀번호 요소 참조 상태         //
    const passwordRef = useRef(null);

    //          state: 비밀번호 확인 요소 참조 상태         //
    const passwordCheckRef = useRef(null);

    //          state: 아이디 요소 참조 상태         //
    const idRef = useRef(null);

    //          state: 이름 요소 참조 상태         //
    const nameRef = useRef(null);

    //          state: 생년월일 요소 참조 상태         //
    const birthRef = useRef(null);

    //          state: 닉네임 요소 참조 상태         //
    const nicknameRef = useRef(null);

    //          state: 핸드폰 번호 요소 참조 상태         //
    const telNumberRef = useRef(null);

    // 입력값과 상태를 관리하기 위한 useState 선언

    //          state: 페이지 번호 상태         //
    const [page, setPage] = useState(1);

    //          state: 이메일 상태         //
    const [email,setemail] = useState('');

    //          state: 비밀번호 상태         //
    const [password, setPassword] = useState('');

    //          state: 비밀번호 확인 상태         //
    const [passwordCheck, setPasswordCheck] = useState('');
    
    //          state: 아이디 상태         //
    const [id, setId] = useState('');
    
    //          state: 이름 상태         //
    const [name, setName] = useState('');
    
    //          state: 생년월일 상태         //
    const [birth, setBirth] = useState('');
    
    //          state: 닉네임 상태         //
    const [nickname, setNickname] = useState('');
    
    //          state: 핸드폰 번호 상태         //
    const [telNumber, setTelNumber] = useState('');
    
    //          state: 개인정보 동의 상태         //
    const [agreedPersonal, setAgreedPersonal] = useState(false);

    // 비밀번호와 비밀번호 확인 필드의 타입을 관리하기 위한 useState 선언
    
    //          state: 패스워드 타입 상태         //
    const [passwordType, setPasswordType] = useState('password');

    //          state: 패스워드 확인 타입 상태         //
    const [passwordCheckType, setPasswordCheckType] = useState('password');

    // 각 필드의 에러 상태를 관리하기 위한 useState 선언

    //          state: 이메일 에러 상태         //
    const [isEmailError, setEmailError] = useState(false);

    //          state: 패스워드 에러 상태         //
    const [isPasswordError, setPasswordError] = useState(false);

    //          state: 패스워드 확인 에러 상태         //
    const [isPasswordCheckError, setPasswordCheckError] = useState(false);

    //          state: 아이디 에러 상태         //
    const [isIdError, setIdError] = useState(false);
    
    //          state: 이름 에러 상태         //
    const [isNameError, setNameError] = useState(false);

    //          state: 생년월일 에러 상태         //
    const [isBirthError, setBirthError] = useState(false);

    //          state: 닉네임 에러 상태         //
    const [isNicknameError, setNicknameError] = useState(false);
    
    //          state: 핸드폰 번호 에러 상태         //
    const [isTelNumberError, setTelNumberError] = useState(false);
    
    //          state: 개인정보 동의 에러 상태         //
    const [isAgreedPersonalError, setagreedPersonalError] = useState(false);

    // 각 필드의 에러 메시지를 관리하기 위한 useState 선언

    //          state: 이메일 에러 메세지 상태         //
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    //          state: 패스워드 에러 메세지 상태         //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    
    //          state: 패스워드 확인 에러 메세지 상태         //
    const [passwordErrorCheckMessage, setPasswordCheckErrorMessage] = useState('');

    //          state: 아이디 에러 메세지 상태         //
    const [idErrorMessage, setIdErrorMessage] = useState('');
    
    //          state: 이름 에러 메세지 상태         //
    const [nameErrorMessage, setNameErrorMessage] = useState('');

    //          state: 생년월일 에러 메세지 상태         //
    const [birthErrorMessage, setBirthErrorMessage] = useState('');

    //          state: 닉네임 에러 메세지 상태         //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

    //          state: 핸드폰 번호 에러 메세지 상태         //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState('');

    // 비밀번호 보기 버튼 아이콘을 관리하기 위한 useState 선언

    //          state: 패스워드 버튼 아이콘 상태          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState('eye-light-off-icon');

    //          state: 패스워드 확인 버튼 아이콘 상태          //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState('eye-light-off-icon');

    //          function: sign up response 처리 함수          //
    const signUpResponse =(responseBody) => {
      if(!responseBody){ 
        alert('네트워크 상태를 확인해주세요.');
        return;
      }
      const { code } = responseBody;
      if(code === 'DE'){
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다');
      }
      if(code === 'DI'){
        setIdError(true);
        setIdErrorMessage('중복되는 아이디입니다');
      }
      if(code === 'DN'){
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다');
      }
      if(code === 'DT'){
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 핸드폰 번호입니다');
      }
      if(code === 'VF') alert ('모든 값을 입력하세요');
      if(code === 'DBE') alert ('데이터 베이스 오류입니다');

      if(code !== 'SU') return;

      setView('sign-in');
    }

     //          event handler: 이메일 변경 이벤트 처리          //
     const onEmailChangeHandler = (event) => {
      const { value } = event.target;
      setemail(value);
      setEmailError(false);
      setEmailErrorMessage('');
    }

    //          event handler: 패스워드 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event) => {
      const { value } = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    
    //          event handler: 패스워드 확인 변경 이벤트 처리          //
    const onPasswordCheckChangeHandler = (event) => {
      const { value } = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
    }
    
    //          event handler: 아이디 변경 이벤트 처리          //
    const onIdChangeHandler = (event) => {
      const { value } = event.target;
      setId(value);
      setIdError(false);
      setIdErrorMessage('');
    }
    
    //          event handler: 이름 변경 이벤트 처리          //
    const onNameChangeHandler = (event) => {
      const { value } = event.target;
      setName(value);
      setNameError(false);
      setNameErrorMessage('');
    }

    //          event handler: 생년월일 변경 이벤트 처리          //
    const onBirthChangeHandler = (event) => {
      const { value } = event.target;
      setBirth(value);
      setBirthError(false);
      setBirthErrorMessage('');
    }

    //          event handler: 닉네임 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event) => {
      const { value } = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage('');
    }

    //          event handler: 핸드폰 번호 변경 이벤트 처리          //
    const onTelNumberChangeHandler = (event) => {
      const { value } = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage('');
    }

    //          event handler: 개인정보 동의 체크 박스 클릭 이벤트 처리         //
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setagreedPersonalError(false);
    }

    //          event handler: 패스워드 버튼 클릭 이벤트 처리         //
    const onPasswordButtonClickHandler = () => {
      if(passwordButtonIcon === 'eye-light-off-icon'){
        setPasswordButtonIcon('eye-light-on-icon');
        setPasswordType('text');
      }
      else {
        setPasswordButtonIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }

    //          event handler: 패스워드 확인 버튼 클릭 이벤트 처리         //
    const onPasswordCheckButtonClickHandler = () => {
      if(passwordCheckButtonIcon === 'eye-light-off-icon'){
        setPasswordCheckButtonIcon('eye-light-on-icon');
        setPasswordCheckType('text');
      }
      else {
        setPasswordCheckButtonIcon('eye-light-off-icon');
        setPasswordCheckType('password');
      }
    }

    //          event handler: 다음 단계 버튼 클릭 이벤트 처리         //
    const onNextButtonClickHadler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if(!isEmailPattern){
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length >= 8
      if(!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 9자 이상 입력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if(!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
      }
      const isCheckedId = id.trim().length >= 5
      if(!isCheckedId){
        setIdError(true);
        setIdErrorMessage('아이디는 5자 이상 입력해주세요.');
      }
      if(!isEmailPattern || !isCheckedId || !isCheckedPassword || isEqualPassword) return;
      setPage(2);
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리          //
    const onSignUpButtonClickHadler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if(!isEmailPattern){
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length >= 8
      if(!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 9자 이상 입력해주세요.');
      }
      const isEqualPassword = password === passwordCheck;
      if(!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
      }
      const isCheckedId = id.trim().length >= 5
      if(!isCheckedId){
        setIdError(true);
        setIdErrorMessage('아이디는 5자 이상 입력해주세요.');
      }
      if(!isEmailPattern || !isCheckedPassword || isEqualPassword || !isCheckedId) {
        setPage(1);
        return;
      };
      const hasName = name.trim().length !== 0;
      if(!hasName){
        setNameError(true);
        setNameErrorMessage('이름을 입력해주세요');
      }
      const birthPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
      const isCheckedBirthPattern = birthPattern.test(birth);
      if(!isCheckedBirthPattern){
        setBirthError(true);
        setBirthErrorMessage('생년월일은 "YYYY-MM-DD"로 입력해주세요');
      }
      const hasNickname = nickname.trim().length !== 0;
      if(!hasNickname){
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요');
      }
      const telNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = telNumberPattern.test(telNumber);
      if (!isTelNumberPattern){
        setTelNumberError(true);
        setTelNumberErrorMessage('숫자만 입력해주세요');
      }
      if(!agreedPersonal) setagreedPersonalError(true);

      if(!hasName || !isCheckedBirthPattern || !hasNickname || !isTelNumberPattern || !agreedPersonal) return;

      const requestBody = {
        email, password, id, name, birth, nickname, telNumber, agreedPersonal
      };

      //signUpRequest(requestBody).then(signUpResponse);
    }

    //          event handler: 로그인 링크 클릭 이벤트 처리         //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    } 

    //          event handler: 이메일 키 다운 이벤트 처리         //
    const onEmailKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!idRef.current) return;
      idRef.current.focus();
    }

    //          event handler: 아이디 키 다운 이벤트 처리         //
    const onIdKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }
    
    //          event handler: 패스워드 키 다운 이벤트 처리         //
    const onPasswordKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }

    //          event handler: 패스워드 확인 키 다운 이벤트 처리         //
    const onPasswordCheckKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      onNextButtonClickHadler();
    }
    
    //          event handler: 이름 키 다운 이벤트 처리         //
    const onNameKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!birthRef.current) return;
      birthRef.current.focus();
    }

    //          event handler: 생년월일 키 다운 이벤트 처리         //
    const onBirthKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!nicknameRef.current) return;
      nicknameRef.current.focus();
    }

    //          event handler: 닉네임 키 다운 이벤트 처리         //
    const onNicknameKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      if(!telNumberRef.current) return;
      telNumberRef.current.focus();
    }

    //          event handler: 핸드폰 번호 키 다운 이벤트 처리         //
    const onTelNumberKeyDownHandler = (event) => {
      if (event.key !== 'Enter') return;
      onSignUpButtonClickHadler();
    }

    //          effect: 페이지가 변경될 때 마다 실행될 함수         //
    useEffect(() => {
      if(page === 2) {
        if(!nameRef.current) return;
        nameRef.current.focus();
      }
    }, [page])


    
    //          render: sign up card 컴포넌트 렌더링          //
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'회원가입'}</div>
              <div className='auth-card-page'>{`${page}/2`}</div>
            </div>
            {page === 1 && (
              <>
                <InputBox ref={emailRef} label='이메일 주소*' type='text' placeholder='이메일 주소를 입력해주세요' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler} />
                <InputBox ref={idRef} label='아이디*' type='text' placeholder='아이디를 입력해주세요' value={id} onChange={onIdChangeHandler} error={isIdError} message={idErrorMessage} onKeyDown={onIdKeyDownHandler} />
                <InputBox ref={passwordRef} label='비밀번호*' type={passwordType} placeholder='비밀번호를 입력해주세요' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
                <InputBox ref={passwordCheckRef} label='비밀번호 확인*' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordErrorCheckMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler} />
              </>
            )}
            {page === 2 && (
              <>
              <InputBox ref={nameRef} label='이름*' type='text' placeholder='이름을 입력해주세요' value={name} onChange={onNameChangeHandler} error={isNameError} message={nameErrorMessage} onKeyDown={onNameKeyDownHandler} />
              <InputBox ref={birthRef} label='생년월일*' type='text' placeholder='생년월일을 입력해주세요' value={birth} onChange={onBirthChangeHandler} error={isBirthError} message={birthErrorMessage} onKeyDown={onBirthKeyDownHandler}  />
              <InputBox ref={nicknameRef} label='닉네임*' type='text' placeholder='닉네임을 입력해주세요' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler} />
              <InputBox ref={telNumberRef} label='핸드폰 번호*' type='text' placeholder='핸드폰 번호를 입력해주세요' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler} />
              </>
            )}
          </div>
          <div className='auth-card-bottom'>
            {page === 1 && (
              <div className='black-large-full-button' onClick={onNextButtonClickHadler}>{'다음 단계'}</div>
            )}
            {page === 2 && (
              <>
                <div className='auth-consent-box'>
                  <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                    <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div> 
                  </div>
                  <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                  <div className='auth-consent-link'>{'더보기 >'}</div>
                </div>
                <div className='black-large-full-button' onClick={onSignUpButtonClickHadler}>{'회원가입'}</div>
              </>
            )}
            <div className='auth-description-box'>
              <div className='auth-description'>{'이미 계정이 있으신가요?'} <span className='auth-description-link' onClick={onSignInLinkClickHandler} >{'로그인'}</span> </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  //          render: 인증 화면 컴포넌트 렌더링          //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'酒酒총회 입니다'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
