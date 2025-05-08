import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandIcon from "@mui/icons-material/Expand";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { use } from "react";

function Note(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setTitle] = useState(props.title);
  const [editedContent, setContent] = useState(props.content);

  function handleClick() {
    props.onDelete(props.id);
  }

  function toggleExpand() {
    setExpanded((prev) => !prev);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function saveEdit() {
    const updatedNote = {
      title: editedTitle,
      content: editedContent,
    };
    fetch(`http://localhost:5000/notes/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then((data) => {
        props.onEdit(props.id, data.title, data.content); //Update State posle db update
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating note:", err));
  }

  function handleTitleChange(event) {
    setTitle(event.target.innerText);
  }

  function handleContentChange(event) {
    setContent(event.target.innerText);
  }

  return (
    <div className="note">
      {isEditing ? ( //proveruvame dali e zapocnato editiranje
        //ako se na ekranot se pojavuva ovoj kod
        <div>
          <h1
            contentEditable
            onBlur={handleTitleChange}
            suppressContentEditableWarning={true}
          >
            {editedTitle}
          </h1>
          <p
            contentEditable
            onBlur={handleContentChange}
            suppressContentEditableWarning={true}
          >
            {editedContent}
          </p>
          <button onClick={saveEdit}>
            <SaveAltIcon />
          </button>
        </div>
      ) : (
        //ako ne e zapocnato editiranje se pojavuva ovoj kod
        <div>
          <h1>{props.title}</h1>
          <p>
            {isExpanded ? props.content : `${props.content.substring(0, 50)}`}
          </p>
          {props.content.length > 50 && (
            <button onClick={toggleExpand}>
              <ExpandIcon />
            </button>
          )}
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
          <button onClick={handleEdit}>
            <EditNoteIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
