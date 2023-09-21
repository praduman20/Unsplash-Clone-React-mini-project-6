import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const fetchImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=xU0_klGSGPimiwAqjlud8TIiX9yDjLfNBWisIeYslA8&query=${value}&orientation=squarish&per_page=9`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length === 0) {
          alert("The requested resource doesn’t exist");
        }
        setResult(data.results);
      });

    setValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchImages();
    }
  };

  return (
    <div className="App">
      <div className="mydiv">
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          UnDab &copy;
        </span>
        <input
          className="pic-value"
          type="text"
          style={{ width: "50%", height: "25px" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search high-resolution pics"
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="search-btn" onClick={() => fetchImages()}>
          SEARCH
        </button>
      </div>
      <div className="gallery">
        {result.map((item) => {
          return (
            <img
              className="item"
              key={item.id}
              src={item.urls.regular}
              alt="Fetched pic"
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
