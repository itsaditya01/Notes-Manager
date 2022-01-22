
import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import PopupEdit from './PopupEdit'
import PopupView from './PopupView'
var randomColor = require('randomcolor');

function Notes(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const [pop, setpop] = useState(false);
    const [view, setview] = useState(false);
    const togglePop = () => {
        if (pop === true) {
            setpop(false);
        }
        if (pop === false) {
            setpop(true);
        }
    }
    const toggleView = () => {
        if (view === true) {
            setview(false);
        }
        if (view === false) {
            setview(true);
        }
    }
    var color = randomColor();
    
    return (
        <div>
            {props.description !== undefined ?
                <div className="note-body" style={{borderTopColor: color}}>
                    <div className="heading">
                        <h3 className="title" style={{backgroundColor: color}}>{props.title}</h3>
                        <p className="tag">#{props.tag}</p>
                    </div>

                    <p className="desc">{props.description !== undefined? props.description.length < 158 ? props.description : props.description.slice(0, 110) + "..." : ""}</p>

                    <div className="icon">
                        <i className="fas fa-eye ms-2 me-3" style={{color: color}} onClick={toggleView}></i>
                        <i className="fas fa-trash mx-3" style={{color: color}} onClick={() => { deletenote(props.id) }}></i>
                        <i className="fas fa-pencil-alt ms-2 me-3" style={{color: color}} onClick={togglePop}></i>
                    </div>
                </div> : ""
            }
            {pop &&
                <PopupEdit pop={pop} togglePop={togglePop} id={props.id} title={props.title} description={props.description} tag={props.tag} />
            }
            {view && 
                <PopupView view={view} toggleView={toggleView} id={props.id} title={props.title} description={props.description} tag={props.tag} />
            }
        </div>
    )
}

export default Notes
