import { useState, useEffect } from "react";
import movieService from "../pages/api/movieService";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveMovies();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveMovies = () => {
    movieService
      .getAll()
      .then((response) => {
        setMovies(response.data);
        console.log('data', response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveMovies();
    setCurrentMovie(null);
    setCurrentIndex(-1);
  };

  const setActiveMovie = (movie: any, index: any) => {
    setCurrentMovie(movie);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    movieService
      .findByTitle(searchTitle)
      .then((response) => {
        setMovies(response.data);
        console.log('data', response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <ul className="list-group">
        {movies &&
          movies.map((movie: any, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveMovie(movie, index)}
              key={index}
            >
              {movie.title}
            </li>
          ))}
      </ul>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => refreshList()}
      >
        Refresh
      </button>
    </div>
  );
}

export default MoviesList;
