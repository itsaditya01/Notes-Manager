import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function PopupEdit(props) {
    const [note, setNote] = useState({ title: props.title, description: props.description, tag: props.tag });
    const context = useContext(noteContext);
    const { editnote } = context;
    const twoInOne = () => {
        editnote(props.id, note.title, note.description, note.tag);
        props.togglePop();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
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
                                    <span className='view_note' name='Title'></span>
                                    <input type="text" onChange={onChange} value={note.title} className="addInput popup_note_details  form-control" name="title" id="title" placeholder="title" />
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="col-12">
                                    <span className='view_note' name='Tag'></span>
                                    <input type="text" onChange={onChange} value={note.tag} name="tag" id="tag" className="addInput popup_note_details  form-control" placeholder="tags" />
                                </div>
                            </div>
                            <div className="form-row my-2">
                                <div className="col-12">
                                    <span className='view_note' name='Description'></span>

                                    <textarea name="description" onChange={onChange} value={note.description} id="description" cols="60" rows="12" className="addInput popup_note_details  form-control" placeholder="write descrption here"></textarea>
                                </div>
                            </div>
                            <div className="form-row text-center my-3">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary" onClick={twoInOne}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    )
}

export default PopupEdit
