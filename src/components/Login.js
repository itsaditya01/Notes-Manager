import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {useHistory} from 'react-router';



function Login() {
    let history = useHistory();
    const host = process.env.REACT_APP_BACKEND_HOST;
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password} = credentials;
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();

        if(data.success){
            localStorage.setItem('token', data.authToken);
            history.push('/');
        }
        else{
            alert(data.error);
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
        <Navbar/>
        <div className="con">
            <div className="outside-box position-absolute w-100 h-100">
                <div className="border-body">
                    <h2 className="text-center login-header">Login</h2>
                    <form action="" method="post" onSubmit={loginUser}>
                        <div className="txt-field">
                            <span className="outline"></span>
                            <input type="text" className="my-form-control input-email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelpId" required/>
                            <label htmlFor="email" className="label form-label-email">Email</label> 
                        </div>
                        <div className="txt-field">
                            <span className="outline"></span>
                            <input type="password" className="my-form-control input-password" value={credentials.password} onChange={onChange} name="password" required/>
                            <label htmlFor="password" className="label form-label-password">Password</label> 
                        </div>
                        <div className="login-button text-center my-3">
                            <button type="submit" className="btn btn-primary text-center px-3 py-2">Login</button>
                        </div>
                        <div className="signup-link text-center mb-4">
                            <p>Don't have an account? <Link to="/signup" className="signup">Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login
