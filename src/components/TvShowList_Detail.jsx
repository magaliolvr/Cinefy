import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import "../style/utils.scss";

function TvShowList_Detail() {
  const { tvShowId } = useParams();

  const { items: tvShow, isLoading } = useData(`tv/${tvShowId}`);
  console.log("passei por aqui, Tv Show list detail. Tv show id, tv show e isloading :", tvShowId, tvShow, isLoading);

  // elenco

  const { items: tvShowCredits } = useData(`tv/${tvShowId}/credits`);
  console.log("passei por aqui, Tv Show list detail ELENCO . Tv show id, tv show e isloading :", tvShowId, tvShowCredits, isLoading);

  if (isLoading) {
    return <p>Carregando séries...</p>;
  }

  // o if (!tvshow) é essencial para que o codigo funcione, isso por que tvShow inicia como undefined, e se eu tentar acessar as propriedades de um objeto que é undefined, o js vai quebrar, entao esse if esta dizendo que se tvShow for undefined, retorna a mensagem de nenhuma serie encontrada. Uma vez que o valor é undefined ele vai voltar a executar até que o valor seja definido, ou seja, quando a requisição terminar e ai sim o valor de tvShow sera um objeto com as propriedades que eu quero acessar.
  if (!tvShow) {
    return <p>Nenhuma série encontrada</p>;
  }

  return (
    <>
      <section>
        <div className="flex flex-wrap gap-xxl">
          <img className="flex1" src={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`} alt={tvShow.title} />
          <div className="flex1">
            <h1>{tvShow.name}</h1>
            <p>{tvShow.overview}</p>
          </div>
        </div>

        {/* elenco */}
        <h2>Cast</h2>
        <div className="detail-list">
          <ul>
            {/* tvShowCredits é um objeto que possui a propriedade 'cast', que é um array de atores. Por isso uso tvShowCrew.cast.map para percorrer o elenco. */}
            {tvShowCredits.cast.map((elenco) => (
              <li key={elenco.id}>
                <img src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`} alt={`Image of ${elenco.original_name} that represents ${elenco.character}`} width="100" />
                <span>
                  {elenco.original_name} as {elenco.character}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* equipe */}
        <h2>Crew</h2>
        <div className="detail-list">
          <ul>
            {tvShowCredits.crew.map((crew) => (
              <li key={crew.crew_id}>
                <span>{crew.name}</span>
                <br />
                <span>{crew.job}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default TvShowList_Detail;
