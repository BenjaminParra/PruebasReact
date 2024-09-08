import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "4287ad07";

const URL_PELICULA_INFO = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;
const URL_PELICULA_POSTER = `http://img.omdbapi.com/?apikey=${API_KEY}&s=`;

function App() {
  const searchResult = document.getElementById("search-result");
  const [movie, setMovie] = useState("");
  const [lastMovieSearched, setLastMovieSearched] = useState("");
  const [peliculas, setPeliculas] = useState("");

  const handleInputChange = (event) => {
    setMovie(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie == lastMovieSearched) {
      console.log("Esta película acabas de buscarla");
      return;
    }
    console.log("Pelicula Buscada:", movie);
    setLastMovieSearched(movie);
    // Limpia el contenido previo
    searchResult.innerHTML = "";
    fetch(URL_PELICULA_INFO + `${movie}`)
      .then((res) => res.json())
      .then((response) => {
        for (let index = 0; index < response.Search.length; index++) {
          const image = document.createElement("img");
          image.src = response.Search[index].Poster;
          const imageLink = document.createElement("a");
          imageLink.href = response.Search[index].Poster;
          imageLink.target = "_blank";
          imageLink.appendChild(image);
          const titulo = document.createElement("h2");
          titulo.textContent = response.Search[index].Title;
          const anio = document.createElement("h4");
          anio.textContent = response.Search[index].Year;
          searchResult.appendChild(imageLink);
          searchResult.appendChild(titulo);
          searchResult.appendChild(anio);
        }
      });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label for="site-search"> Busca la película</label>
        <input
          id="site-search"
          type="text"
          placeholder="Star Wars, Mamma Mia.."
          value={movie}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div id="search-result"></div>
    </div>
  );
}

export default App;
