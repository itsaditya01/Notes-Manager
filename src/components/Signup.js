import React, { useState } from 'react'
import { useHistory } from 'react-router';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


function Signup() {
    const host = process.env.REACT_APP_BACKEND_HOST
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const createUser = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, cpassword })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.authToken);
            history.push('/');
        }
        else {
            alert(data.error);
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Navbar />
            <div className="con">
                <div className="outside-box position-absolute w-100 h-100">
                    <div className="border-body">
                        <h2 className="text-center login-header">Signup</h2>
                        <form action="" method="post" onSubmit={createUser}>
                            <div className="txt-field" >
                                <span className="outline"></span>
                                <input type="text" onChange={onChange} value={credentials.name} className="my-form-control input-email" name="name" aria-describedby="emailHelpId" required />
                                <label htmlFor="email" className="label form-label-email">Name</label>
                            </div>
                            <div className="txt-field">
                                <span className="outline"></span>
                                <input type="text" onChange={onChange} value={credentials.email} className="my-form-control input-email" name="email" aria-describedby="emailHelpId" required />
                                <label htmlFor="email" className="label form-label-email">Email</label>
                            </div>
                            <div className="txt-field">
                                <span className="outline"></span>
                                <input type="password" onChange={onChange} value={credentials.password} className="my-form-control input-password" name="password" required />
                                <label htmlFor="password" className="label form-label-password">Password</label>
                            </div>
                            <div className="txt-field">
                                <span className="outline"></span>
                                <input type="password" onChange={onChange} value={credentials.cpassword} className="my-form-control input-password" name="cpassword" required />
                                <label htmlFor="cpassword" className="label form-label-password">Confirm password</label>
                            </div>
                            <div className="login-button text-center my-3 mb-4">
                                <button type="submit" className="btn btn-primary text-center px-3 py-2">Create Account</button>
                            </div>
                            <div className="signup-link text-center mb-4">
                                <p>already have an account? <Link to="/login" className="signup">login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
