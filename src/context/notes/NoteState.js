import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    const [notes, setNotes] = useState([{}]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    //fetching all notes
    const getallnotes = async () => {
        setLoading(true);
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setNotes(data);
        setLoading(false);
    }

    //adding note
    const addnote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const data = await response.json();

        setNotes(notes.push(data));
        getallnotes();
    }

    //editing note
    const editnote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //to delete note
    const deletenote = async (id) => {
        //API call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              "auth-token": localStorage.getItem('token')
            }
          });
        // eslint-disable-next-line
          const json = response.json(); 
          const newNotes = notes.filter((note) => { return note._id !== id })
          setNotes(newNotes)
    }

    //To get details of user
    const getUser = async (authToken) => {
        //API call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
              "auth-token": localStorage.getItem('token')
            }
          });
        const data = await response.json();
        setUser(data)
    }
    return(
        <NoteContext.Provider value={{notes, getallnotes, addnote, editnote ,deletenote, loading, user, getUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}  

export default NoteState;