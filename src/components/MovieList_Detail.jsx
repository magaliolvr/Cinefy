import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";
import { useParams } from "react-router";

function MoviesListDetail() {
  const { movieId } = useParams();

  const { items: movies, isLoading } = useData(`movie/${movieId}`);
  console.log("passei por aqui, Movie list detail. Movie id, movies e isloading :", movieId, movies, isLoading);

  // elenco
  const { items: movieCredits } = useData(`movie/${movieId}/credits`);
  console.log("passei por aqui, Movie list details ELENCO :", movieCredits);

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
      <br />
      {/* elenco */}
      <ul>
        {movieCredits.cast.map((elenco) => (
          <li key={elenco.cast_id}>
            <img src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`} alt={`Image of ${elenco.original_name} that represents ${elenco.character}`} width={100} />
            <span>
              {elenco.original_name} as {elenco.character}
            </span>
          </li>
        ))}
      </ul>
      {/* crew */}
      <ul>
        {movieCredits.crew.map((crew) => (
          <li key={crew.credit_id}>
            <span>{crew.name}</span>
            <br />
            <span>{crew.job}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoviesListDetail;
