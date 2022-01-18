
import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import PopupEdit from './PopupEdit'
var randomColor = require('randomcolor');

function Notes(props) {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const [pop, setpop] = useState(false);
    const togglePop = () => {
        if (pop === true) {
            setpop(false);
        }
        if (pop === false) {
            setpop(true);
        }
    }
    var color = randomColor();
    
    return (
        <div>
            {props.description !== undefined ?
                <div class="note-body" style={{borderTopColor: color}}>
                    <div class="heading">
                        <h3 class="title" style={{backgroundColor: color}}>{props.title}</h3>
                        <p class="tag">#{props.tag}</p>
                    </div>

                    <p class="desc">{props.description !== undefined? props.description.length < 158 ? props.description : props.description.slice(0, 110) + "..." : ""}</p>

                    <div class="icon">
                        <i className="fas fa-eye ms-2 me-3" style={{color: color}} onClick={togglePop}></i>
                        <i className="fas fa-trash mx-3" style={{color: color}} onClick={() => { deletenote(props.id) }}></i>
                        <i className="fas fa-pencil-alt ms-2 me-3" style={{color: color}} onClick={togglePop}></i>
                    </div>
                </div> : ""
            }
            {pop &&
                <PopupEdit pop={pop} togglePop={togglePop} id={props.id} title={props.title} description={props.description} tag={props.tag} />
            }
        </div>
    )
}

export default Notes
