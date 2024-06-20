

// 주석 처리 asd
import { useState } from "react";

const FormTest = () => {

    // 변수 선언
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("@google.com");

    const handleSubmit = (event) => {
        alert(`이름 : ${name}\n나이 : ${age}\ne-mail : ${email}${domain}`);
        // 새로고침 방지
        event.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>이름 : </label>
                <input type="text" name="name" id="name" onChange={event => {setName(event.target.value)}} value={name}/>
                <br/><br/>
                <label>나이 : </label>
                <input type="text" name="age" id="age" onChange={event => {setAge(event.target.value)}} value={age}/>
                <br/><br/>
                <label>e-mail : </label>
                <input type="text" name="email" id="email" onChange={event =>{setEmail(event.target.value)}} value={email}/>
                    <select name="domain" onChange={event => {setDomain(event.target.value)}}>
                        <option value="@naver.com">@naver.com</option>
                        <option value='@daum.net'>@daum.net</option>
                        <option value="@google.com">@google.com</option>
                    </select>
                    <br/><br/>
                    <input type="submit" value="전송"/>
            </form>
            <h1>결과</h1>
            <p>이름 : {name} </p>
            <p>나이 : {age} </p>
            <p>이메일 : {email}{domain} </p>
        </>
    )
}

export default FormTest;
