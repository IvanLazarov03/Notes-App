import React from "react";
import CreateIcon from "@mui/icons-material/Create";

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <CreateIcon /> Notes
      </h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
}

export default Header;
