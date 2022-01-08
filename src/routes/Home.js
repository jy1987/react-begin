import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      )
    ).json();

    setMovies(json.data.movies);
    setLoading((current) => !current);
  };
  useEffect(() => {
    getMovies();
  }, []);

  //console.log(movies);
  //console.log(loading);
  return (
    <div>
      <h4>Movies ({movies.length})</h4>
      {loading ? (
        "Loading..."
      ) : (
        <h1>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImage={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </h1>
      )}
    </div>
  );
}

export default Home;
