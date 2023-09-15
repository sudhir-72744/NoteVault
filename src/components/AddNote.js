import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };
  return (
    <div>
      <form className="mt-5">
        <h2 className="mb-4">Add a Note</h2>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            onChange={handlechange}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={note.description}
            onChange={handlechange}
            type="text"
            name="description"
            className="form-control"
            id="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            onChange={handlechange}
            type="text"
            name="tag"
            className="form-control"
            id="tag"
          />
        </div>

        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          onClick={handleclick}
          className="btn btn-primary "
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
