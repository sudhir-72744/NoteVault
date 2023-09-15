import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(noteContext);
  const { delNote, editNote } = context;
  // console.log(note);
  return (
    <div className="col-md-3">
      <div className="card mt-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title overflow-hidden">{note.title}</h5>
            <i
              className="mx-2 mt-1 fa-solid fa-trash"
              onClick={() => {
                props.showAlert("Note deleted successfully", "success");
                delNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid mt-1 fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="overflow-hidden">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
