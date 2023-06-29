import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import HighlightIcon from '@mui/icons-material/Highlight';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleExpanded(e){
    setIsExpanded(true);
  }


  function submitNote(e) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    e.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="title"
          placeholder="Title"
          value={note.title}
        />:null}
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          onClick={(e) =>{
            handleExpanded(e);
          }}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded? 3: 1}
          value={note.content}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={(e) => {
              submitNote(e);
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
