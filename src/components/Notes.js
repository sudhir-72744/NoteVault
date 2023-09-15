import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import AddNote from "./AddNote";
import { tab } from "@testing-library/user-event/dist/tab";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("inote_auth_token")) {
      getAllNotes();
      console.log(notes);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  // console.log(notes);

  const updateNote = (actualNote) => {
    ref.current.click();

    setNote({
      eid: actualNote._id,
      etitle: actualNote.title,
      edescription: actualNote.description,
      etag: actualNote.tag,
    });
  };
  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    closeModal.current.click();
    e.preventDefault();
    console.log(note);
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    props.showAlert("Note updated successfully", "success");
  };
  const ref = useRef(null);
  const closeModal = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="invisible btn btn-primary my-2 "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form className="">
                  <h2 className="mb-4">Add a Note</h2>
                  <div className="mb-3 ">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      onChange={handlechange}
                      type="text"
                      value={note.etitle}
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      value={note.edescription}
                      onChange={handlechange}
                      type="text"
                      name="edescription"
                      className="form-control"
                      id="edescription"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      value={note.etag}
                      onChange={handlechange}
                      type="text"
                      name="etag"
                      className="form-control"
                      id="etag"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={closeModal}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                type="button"
                onClick={handleclick}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>your notes</h2>
        <div className="container">
          {notes.length === 0 && `No Notes to Display`}
        </div>
        {notes.length !== 0 &&
          notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
              />
            );
          })}
      </div>
    </>
  );
};

export default Notes;
