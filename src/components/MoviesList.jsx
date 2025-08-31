import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";

function MoviesList() {
  const { items: movies, isLoading } = useData("movie/popular");

  if (isLoading) {
    return <p>Carregando filmes...</p>;
  }

  return (
    <>
      {Array.isArray(movies) ? (
        movies.map((movie) => {
          return (
            <Link key={movie.id} to={`/moviedetail/${movie.title}`}>
              <ContentCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} date={movie.release_date} />
            </Link>
          );
        })
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </>
  );
}

export default MoviesList;
