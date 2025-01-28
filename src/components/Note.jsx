import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandIcon from "@mui/icons-material/Expand";
import { use } from "react";

function Note(props) {
  const [isExpanded, setExpanded] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  function toggleExpand() {
    setExpanded((prev) => !prev);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{isExpanded ? props.content : `${props.content.substring(0, 50)}`}</p>
      {props.content.length > 50 && (
        <button onClick={toggleExpand}>
          <ExpandIcon />
        </button>
      )}
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
