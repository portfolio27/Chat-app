// const { useState } = require("react");
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "", lastName: "", userId: "", email: "", password: "", picturePath: ""
    })

    let name, value;
    const handleEvent = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser( (prevData)=> {
            return {...prevData, [name]: value}
        })

    }

    const register = async (e) => {
        e.preventDefault();

        const response = await fetch('/auth/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.userId,
                email: user.email,
                password: user.password,
                picturePath: user.picturePath
            })
        })

        

        const data = await response.json();
        console.log(data);
        navigate('/auth/login', {replace: true})
    }

    return (
        <div>
            
            <label>First Name:</label>
            <input onChange={handleEvent} value={user.firstName} name="firstName"></input>

            <label>Last Name:</label>
            <input onChange={handleEvent} value={user.lastName} name="lastName"></input>

            <label>UserId:</label>
            <input onChange={handleEvent} value={user.userId} name="userId"></input>

            <label>Email:</label>
            <input onChange={handleEvent} value={user.email} name="email"></input>

            <label>Password:</label>
            <input onChange={handleEvent} value={user.password} name="password"></input>

            <label>Picture Path:</label>
            <input onChange={handleEvent} value={user.picturePath} name="picturePath"></input>

            <button onClick={register}>Register</button>
            
        </div>
    )
}

export default Register;