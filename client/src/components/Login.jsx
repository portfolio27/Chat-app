import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate();
    // const history = useHistory();s

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    let name, value;
    const handleEvent = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser( (prevData)=> {
            return {...prevData, [name]: value}
        })
    }

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('https://chat-app-backend-zeta.vercel.app/auth/login', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })  

        const data = await response.json();
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.message._id);
        localStorage.setItem('userId', data.message.userId)

        const contactResponse = await fetch('https://chat-app-backend-zeta.vercel.app/contact', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({
                token: data.token,
                userId: data.message._id
            })
        })

        const contactData = await contactResponse.json();

        if(contactResponse.ok) {
            document.cookie = "array=" + JSON.stringify(contactData.message);
            localStorage.setItem('array', JSON.stringify(contactData.message))
            console.log(localStorage.getItem('array'));
            navigate('/contact', {replace: true})
        }
        // history.push('/')
    }

    return (
        <div>
            <label>Email:</label>
            <input onChange={handleEvent} value={user.email} name="email"></input>

            <label>Password:</label>
            <input onChange={handleEvent} type="password" value={user.password} name="password"></input>

            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;
