import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched notes:", data);
        setNotes(data.sort((a, b) => a.id - b.id)); //so ovaa linija redosledot ne se menuva po izmena na note
      })
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  //ova e funkcija vo koja se koriste post request so koj vmentuvame nov note vo databazata
  //so headers specificirame kakov tip na podatok ke se isprati
  //bidejki newNote e objekt koristime JSON.stringify za toj da bide pretvoren vo JSON string
  function addNote(newNote) {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      //ovde koristime res.json za da go dobieme noviot note kako objekt
      .then((res) => res.json())
      //setNotes e funkcijata so koja se updatejtira state na note komponentot
      //prevNotes e minatiot state na nizata so notes
      //...prevNotes e spread sintaksa,koja gi kopira site postoecki notes vo nova niza
      //addedNote e novo kreriraniot note koj go dodadovme
      .then((addedNote) => {
        if (addNote && addedNote.title && addedNote.content) {
          setNotes((prevNotes = []) => [...prevNotes, addedNote]); //ovde imav greska pisuvase addNote a mora da pisuva addedNote za da se pojavi note odma po klikanje na kopceto a ne po refresh
        }
      })
      .catch((err) => console.error(err));
  }

  //ova e funkcija za brisenje na note od db
  //ovde isprakame delete request do server.js
  //taka sto setNotes go postavuvame da ni e prevNotes bez samo note so id na noteItem
  function deleteNote(id) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.filter((noteItem) => {
            return noteItem.id !== id;
          });
        });
      })
      .catch((err) => console.error(err));
  }

  function editNote(id, newTitle, newContent) {
    //se isprakat izmenetite podatoci do bek endot
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT", //put request se koristi za updejtiranje
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
    })
      .then((res) => res.json())
      .then((updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((noteItem) =>
            noteItem.id === id
              ? {
                  ...noteItem,
                  title: updatedNote.title,
                  content: updatedNote.content,
                }
              : noteItem
          )
        );
      })
      .catch((err) => console.error("Error editing note", err));
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div>
        <CreateArea onAdd={addNote} />
        {filteredNotes.map((noteItem, index) => {
          return (
            <Note
              key={noteItem.id}
              id={noteItem.id} //tuka ako id e index moze da se sluce da ne isto kako i id vo databazata pa zatoa najdobro e da se pisuva noteItem.id
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default App;
