import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";
import { useParams } from "react-router";

function MoviesListDetail() {
  const { movieId } = useParams();

  const { items: movies, isLoading } = useData(`movie/${movieId}`);
  console.log("passei por aqui, Movie list detail. Movie id, movies e isloading :", movieId, movies, isLoading);

  if (isLoading) {
    return <p>Carregando filmes...</p>;
  }

  if (!movies) {
    return <p>Nenhum detalhe encontrado.</p>;
  }

  return (
    <>
      <img src={`https://image.tmdb.org/t/p/w500${movies.backdrop_path}`} alt={movies.title} />
      <h2>{movies.title}</h2>
      <p>{movies.overview}</p>
    </>
  );
}

export default MoviesListDetail;
