import React, { useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
//ovde se importat ikoni od material ui
//koi podolu vo kodot se vmetnuvaat kako komponenti so svoi tagovi

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  //kreirame konst so koj ke proveruvame vo koj state e textarea

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  //so ovaa funkcija ovozmozuvame menuvanje na pocetniot state koj ni e false
  function expand() {
    setExpanded(true);
  }

  //ovde koristime conditional rendering so toa sto
  //go proveruvame stejtot na isExpanded i ako e tocen go vrakame input poleto vo prviot slucaj
  //vo vtoriot slucaj go ako e tocno imame vo textarea 3 reda ako ne e 1 red
  //i vo tretiot slucaj ako e tocno fab komponento ke izvrsi zoom in ako ne e nema
  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddCircleOutlineOutlined />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
