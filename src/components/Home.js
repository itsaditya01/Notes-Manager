import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Navbar from './Navbar'
import Notebook from './Notebook'

function Home() {
    const context = useContext(noteContext);
    const { getUser } = context;
    useEffect(() => {
        getUser().then(() => {
        });
    }, [])
    return (
        <div>
            <Navbar />
            <Notebook />
        </div>
    )
}

export default Home
