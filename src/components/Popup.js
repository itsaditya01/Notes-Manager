import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function Popup(props) {
    const [note, setNote] = useState({ title: "", description: "", tag: ""})
    const context = useContext(noteContext);
    const { addnote } = context;
    const twoInOne = ()=>{
        addnote(note.title, note.description, note.tag);
        props.togglePop();
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
        {props.pop && 
            <div className="popup">
            <div className="popup-inner  d-flex">
                <form action="" method="post">
                    <span className="cancel-icon">
                        <i className="fas fa-window-close" onClick={props.togglePop}></i>
                    </span>
                    <div className="form-row my-2">
                        <div className="col-12">
                            <input type="text" onChange={onChange} className="addInput form-control" name="title" id="title" placeholder="title"/>
                        </div>
                    </div>
                    <div className="form-row my-2">
                        <div className="col-12">
                            <input type="text" onChange={onChange} name="tag" id="tag" className="addInput form-control" placeholder="tags"/>
                        </div>
                    </div>
                    <div className="form-row my-2">
                        <div className="col-12">
                            <textarea name="description" onChange={onChange} id="description" cols="60" rows="10" className="addInput form-control" placeholder="write descrption here" ></textarea>
                        </div>
                    </div>
                    <div className="form-row text-center my-3">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" onClick={twoInOne}>Save & Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>}
        </>
    )
}

export default Popup
