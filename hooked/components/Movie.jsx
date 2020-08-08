import React from "react";

const placeholder =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

/**
 * <Movie movie={movie} />
 * movie: {Poster: 画像URL, Title: タイトル, Year: 上映年}
 */
const Movie = ({ movie }) => {
  const poster = (movie.Poster === "N/A"? placeholder: movie.Poster);
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img width="200" alt={`The movie titled: ${movie.Title}`} src={poster} />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
}
export default Movie;