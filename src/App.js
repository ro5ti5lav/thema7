import React, { useState } from "react";
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const query = data.get("newsInput");

    const url = "https://content.guardianapis.com/search";
    const apiKey = "76e8960f-2f67-417b-88b0-05e88b71ee5a";

    fetch(`${url}?q=${query}&api-key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.response.results);
      });
  };

  return (
    <div className="App">
      <div className="main-content">
        <div className="container">
          <h1>Получите самые свежие новости от газеты <br />The Guardian!</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label>Введите интересующую тему:</label>
            <input type="text" name="newsInput" className="newsInput" />
            <button className="button" type="submit">Получить список статей</button>
          </form>
        </div>
        <div className="sidebar">
          {articles.map((item) => (
            <div key={item.id} className="article">
              <h2>{item.webTitle}</h2>
              <p>{item.sectionName}</p>
              <a href={item.webUrl} target="_blank" rel="noopener noreferrer">Читать далее</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
