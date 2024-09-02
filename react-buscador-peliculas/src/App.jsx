import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [lastMovieSearched, setLastMovieSearched] = useState("");

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
      {movie && <p>{movie} </p>}
    </div>
  );
}

export default App;
