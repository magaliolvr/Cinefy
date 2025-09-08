import { useData } from "../hooks/useData";
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
      <section>
        <div className="flex flex-wrap gap-xxl">
          <img className="flex1" src={`https://image.tmdb.org/t/p/w500${movies.backdrop_path}`} alt={movies.title} />
          <div className="flex1">
            <h2>{movies.title}</h2>
            <p>{movies.overview}</p>
          </div>
        </div>

        <h3>Cast</h3>
        <div className="detail-list">
          {/* Cast */}
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
        </div>

        <h3>Crew</h3>
        <div className="detail-list">
          {/* Crew */}
          <ul>
            {movieCredits.crew.map((equipe) => (
              <li key={equipe.id}>
                <span>{equipe.name}</span>
                <br />
                <span>{equipe.job}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default MoviesListDetail;
