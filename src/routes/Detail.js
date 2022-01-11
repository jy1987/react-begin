import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../loading.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <h1 className={styles.loading}>Waiting....</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.medium_cover_image}></img>
          <ul>
            {movie.genres
              ? movie.genres.map((g) => <li key={g}>{g}</li>)
              : null}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
