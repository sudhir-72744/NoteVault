import { json } from "react-router-dom";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:7000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const authtoken = localStorage.getItem("inote_auth_token");
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("inote_auth_token"),
      },
    });
    const res = await response.json();
    // console.log("getting all notes");
    // console.log(res);
    setNotes(res);
  };
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("inote_auth_token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const res = await response.json();

    // console.log(res);

    if (!res.error) {
      // console.log("adding a note");
      setNotes(notes.concat(res));
    }
    // notes.concat(res);
  };

  const delNote = async (id) => {
    // console.log("deleting note " + id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("inote_auth_token"),
      },
    });
    await response;
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    // console.log("editing note " + id);

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("inote_auth_token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
    let nNBTSCBUITFW = JSON.parse(JSON.stringify(notes));
    for (let ind = 0; ind < nNBTSCBUITFW.length; ind++) {
      const element = nNBTSCBUITFW[ind];
      if (element._id === id) {
        nNBTSCBUITFW[ind].title = title;
        nNBTSCBUITFW[ind].description = description;
        nNBTSCBUITFW[ind].tag = tag;
        setNotes(nNBTSCBUITFW);
        break;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, delNote, editNote, setNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
