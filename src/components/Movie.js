import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImage, title, summary, genres }) {
  return (
    <div>
      <img src={coverImage}></img>
      <h2 style={{ color: "tomato" }}>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p style={{ color: "khaki" }}>{summary}</p>
      {console.log(Boolean(genres))}
      <ul>
        {genres
          ? genres.map((g) => {
              <li key={g}>{g}</li>;
            })
          : null}
      </ul>
    </div>
  );
}

Movie.prototype = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
