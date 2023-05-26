import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [titles, setTitles] = useState([]);
  const [input, setInput] = useState("");
  const lodaData = () => {
    fetch("http://localhost:3456/api/v1/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitles(data.title);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    lodaData();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddNote = () => {
    console.log(input);
    const title = input;
    fetch("http://localhost:3456/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        lodaData();
        setInput("");
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3456/api/v1/notes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        lodaData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <header>
        <p>Note App</p>
      </header>
      <div className="main">
        <div className="elementInput">
          <h5>Title</h5>
          <input
            type="text"
            className="mainInput"
            id="mainInput"
            placeholder="take a note ..."
            value={input}
            name="input"
            onChange={(event) => handleInputChange(event)}
          />
          <div className="addNote" onClick={handleAddNote}>
            +
          </div>
        </div>
      </div>
      <div className="container">
        {titles?.map((title, i) => (
          <div className="element" key={i}>
            <div className="note">{title.title}</div>
            <div className="delete" onClick={() => handleDelete(title.noteId)}>
              Xóa
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
