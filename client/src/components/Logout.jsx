import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();


    const logout = async (e) => {
        e.preventDefault();
    
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/auth/login', {replace: true})
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Logout;