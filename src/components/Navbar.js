import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import noteContext from '../context/notes/noteContext';

export default function Navbar() {
    const context = useContext(noteContext);
    const { user } = context;
    let history = useHistory();
    const [nav, setNav] = useState(false);
    const handleScroll = () => {
        if (window.pageYOffset > 40) {
            if (!nav)
                setNav(true);
        }
        else {
            if (nav)
                setNav(false);
        }
    }
    useEffect(() => {
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    window.addEventListener('scroll', handleScroll);
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/about');
    }
    let color = nav ? "white" : "black";

    return (
        <div className="main-navbar">
            <nav className={`navbar fixed-top navbar-expand-lg ${nav || !localStorage.getItem('token') ? "navbar-dark" : "navbar-light"} ${nav || !localStorage.getItem('token') ? "nav__black" : "nav__white"}`}>
                <div className="container">
                    <Link className="navbar-brand me-auto" to="/"><h2>iNotes</h2></Link>
                    {localStorage.getItem('token') ?
                        <div className="d-flex justify-content-lg-end position-relative">
                            <div className="user">
                                <i className="fas fa-user-circle fa-2x " style={{ color: color }} ></i>
                                <div className="menu">
                                    <div className="name">{user.name}</div>
                                    <div className="email text-muted">{user.email}</div>
                                    <Link className="logout" onClick={() => handleLogout()} to="/about"><i class="fas fa-sign-out-alt"></i> Logout</Link>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            </nav>
        </div>
    )
}

