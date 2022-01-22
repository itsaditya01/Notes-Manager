import React from 'react';
import { useState, useContext, useEffect } from 'react';
import Popup from './Popup';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import { useHistory } from 'react-router';

function Notebook() {
    let history = useHistory();
    let num = 0;
    const [nav1, setNav1] = useState(false);
    const context = useContext(noteContext);
    const { notes, getallnotes, loading } = context;
    const [pop, setpop] = useState(false);
    const togglePop = () => {
        if (pop === true) {
            setpop(false);
        }
        if (pop === false) {
            setpop(true);
        }
    }
    const handleScroll = () => {
        if (window.pageYOffset > 25) {
            if (!nav1)
                setNav1(true);
        }
        else {
            if (nav1)
                setNav1(false);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallnotes();
        }
        else {
            history.push('/about')
        }
    }, [])
    return (
        <div className="notebook">
            <div className="container">
                <div className={`${nav1 ? "notebook-header" : "notebook-header-active"} d-flex my-3 align-items-center`}>
                    <div className="title-inner w-100 ms-4">
                        <h4>All Notes</h4>
                    </div>
                    <div className="addnew flex-shrink-1 me-4">
                        <span className="addnew-icon">
                            <i className="fas fa-plus-circle fa-2x" onClick={() => setpop(true)}></i>
                        </span>
                    </div>
                </div>
                {pop &&
                    <Popup pop={pop} togglePop={togglePop} />}
                <div className="row">
                    {notes.length !== 0 ?
                        notes.map((note) => {
                            return (
                                <div key={num++} className="col-sm-12 col-md-6 col-12 col-lg-4">
                                    <Notes key={note._id} title={note.title} description={note.description} tag={note.tag} id={note._id} />
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
            {loading ? <div className="nonedisplay">
                <img src="./loader6.gif" alt="loading" className="py-10" style={{ width: '50px', height: '50px' }} />
            </div> : ""}
            {notes.length === 0 && !loading? <div className="">
                {notes.length === 0 && <div className="nonedisplay"><h4>No notes to display</h4></div>}
            </div> : ""}
        </div>
    )
}

export default Notebook;
