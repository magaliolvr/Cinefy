import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import "../style/utils.scss";

function TvShowList_Detail() {
  const { tvShowId } = useParams();

  const { items: tvShow, isLoading:loadingTvShow } = useData(`tv/${tvShowId}`);
  const { items: tvShowCredits, isLoading:loadingTvCredits } = useData(`tv/${tvShowId}/credits`);

  if (loadingTvShow || loadingTvCredits ) return <p>Carregando séries</p>;
  if (!tvShow || !tvShowCredits ) return <p>Nenhum série encontrada </p>  // o if (!tvshow) é essencial para que o codigo funcione, isso por que tvShow inicia como undefined, e se eu tentar acessar as propriedades de um objeto que é undefined, o js vai quebrar, entao esse if esta dizendo que se tvShow for undefined, retorna a mensagem de nenhuma serie encontrada. Uma vez que o valor é undefined ele vai voltar a executar até que o valor seja definido, ou seja, quando a requisição terminar e ai sim o valor de tvShow sera um objeto com as propriedades que eu quero acessar.

  // --- Agrupar crew por pessoa ---
  const groupedCrew = {}; // objeto vazio que vai receber os dados agrupados.
  tvShowCredits.crew.forEach(member => { // para cada membro da equipe (crew) do tvShowCredits, executa a função.
    const name = member.name; // const name recebe o nome do membro da equipe.
    if (!groupedCrew[name]) { // se o nome do membro da equipe não existir no objeto groupedCrew, cria uma nova entrada.
      groupedCrew[name] = { department: member.department, jobs: [member.job] }; // cria uma nova entrada com o departamento e um array contendo o trabalho atual.
    } else { //
      if (!groupedCrew[name].jobs.includes(member.job)) groupedCrew[name].jobs.push(member.job);// se o nome do membro da equipe já existir no objeto groupedCrew, verifica se o trabalho atual já está no array de trabalhos; se não estiver, adiciona-o.
    }
  });
  // para cada membro da equipe (crew), verifica se o nome já existe no objeto groupedCrew. Se não existir, cria uma nova entrada com o departamento e um array contendo o trabalho atual. Se já existir, verifica se o trabalho atual já está no array de trabalhos; se não estiver, adiciona-o.



  

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
    </>
  );
}

export default TvShowList_Detail;
