import React from 'react'
import Navbar from './Navbar'
import { Link } from "react-router-dom";


function About() {
    return (
        <div>
            <Navbar />
            <div className="main__about">
                <div className="row about__row d-flex flex-row-reverse">
                    <div className="col-sm-1"></div>
                    <div className="col-md-5 col-sm-12 col-12 d-flex align-items-center justify-content-center">
                        <img src="./about_page.png" className='about__ill' alt="" />
                    </div>
                    <div className="col-md-5 col-sm-11 col-10 d-flex align-items-center justify-content-center">
                        <div className="main__heading d-flex justify-content-center flex-column">
                            <div>
                                <h1 className="about__font__h1">
                                    Hello, Welcome to iNotes
                                </h1>
                            </div>
                            <div className="pt-2 pb-3">
                                <h3 className='about__font__h3'>
                                    Sign In to explore the features of iNotes
                                </h3>
                            </div>
                            <div>
                                <Link to='/login'><button className="btn btn-dark main__btn">Sign In</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        </div>
    )
}

export default About
