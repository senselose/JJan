import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout ({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/logout')
            .then(respone => {
                onLogout();
                navigate('/');
            })
            .catch(error => {
                console.error('로그아웃 실패:' , error);
                navigate('/');
            });
    }, [navigate, onLogout]);

    return null;
}
export default Logout;
    
