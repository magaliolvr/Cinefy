import { useData } from "../hooks/useData";
import { useParams } from "react-router";

function MoviesListDetail() {
  const { movieId } = useParams();

  const { items: movie, isLoading: loadingMovie} = useData(`movie/${movieId}`);
  const { items: credits, isLoading: loadingCredits } = useData(`movie/${movieId}/credits`);

  if (loadingMovie || loadingCredits) return <p>Carregando filmes...</p>; //se loadingMovie for true ou loadingCredits for true, retorna a mensagem de carregando filmes.
  if (!movie || !credits) return <p>Nenhum detalhe encontrado.</p>; //se movie for null ou undefined, ou credits for null ou undefined, retorna a mensagem de nenhum detalhe encontrado.

  // --- Agrupar crew por pessoa ---
  const groupedCrew = {};
  credits.crew.forEach(member => {
    const name = member.name;
    if (!groupedCrew[name]) {
      groupedCrew[name] = { department: member.department, jobs: [member.job] };
    } else {
      if (!groupedCrew[name].jobs.includes(member.job)) groupedCrew[name].jobs.push(member.job);
    }
  });
  // para cada membro da equipe (crew), verifica se o nome já existe no objeto groupedCrew. Se não existir, cria uma nova entrada com o departamento e um array contendo o trabalho atual. Se já existir, verifica se o trabalho atual já está no array de trabalhos; se não estiver, adiciona-o.

  return (
    <section>
      {/* Filme */}
      <div className="flex flex-wrap gap-xxl">
        <img
          className="flex1"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="flex1">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Cast */}
      <h3>Cast</h3>
      <div className="detail-list">
        <ul>
          {credits.cast.map(elenco => (
            <li key={elenco.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`}
                alt={`${elenco.original_name} as ${elenco.character}`}
                width={100}
              />
              <span>{elenco.original_name} as {elenco.character}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Crew */}
      <h3>Crew</h3>
      <div className="detail-list">
        <ul>
          {Object.entries(groupedCrew).map(([name, info]) => (
            <li key={name}>
              <span>{name}</span>
              <br />
              <span>{info.department}: {info.jobs.join(", ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MoviesListDetail;
