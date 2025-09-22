import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import "../style/utils.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// estilos obrigatórios do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRating from "./StarRating";

function TvShowList_Detail() {
  const { tvShowId } = useParams();

  const { items: tvShow, isLoading: loadingTvShow } = useData(`tv/${tvShowId}`);
  const { items: tvShowCredits, isLoading: loadingTvCredits } = useData(`tv/${tvShowId}/credits`);

  if (loadingTvShow || loadingTvCredits) return <p>Carregando séries</p>;
  if (!tvShow || !tvShowCredits) return <p>Nenhum série encontrada </p>  // o if (!tvshow) é essencial para que o codigo funcione, isso por que tvShow inicia como undefined, e se eu tentar acessar as propriedades de um objeto que é undefined, o js vai quebrar, entao esse if esta dizendo que se tvShow for undefined, retorna a mensagem de nenhuma serie encontrada. Uma vez que o valor é undefined ele vai voltar a executar até que o valor seja definido, ou seja, quando a requisição terminar e ai sim o valor de tvShow sera um objeto com as propriedades que eu quero acessar.

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
            <p><strong>Genre:</strong> {tvShow.genres.map((genre) => genre.name).join(", ")}</p> {/* o map traz um array com os nomes dos gêneros e o join transforma esse array em uma string */}
            <StarRating rating={tvShow.vote_average} />
            <div className="flex-column gap-s">
              <strong>First Air Date:</strong> {tvShow.first_air_date}
              <strong>Seasons:</strong> {tvShow.number_of_seasons}
              <strong>Episodes:</strong> {tvShow.number_of_episodes}
            </div>
          </div>
        </div>

        {/* elenco */}
        <h2>Cast</h2>
        <div className="detail-list">
          <ul>
            <Swiper style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
              modules={[Pagination, Navigation, Mousewheel]}
              grabCursor={true}
              mousewheel={{ forceToAxis: true }} // faz movimento scroll horizontal
              spaceBetween={50}
              slidesPerView="auto"
              className="mySwiper" >


              {/* tvShowCredits é um objeto que possui a propriedade 'cast', que é um array de atores. Por isso uso tvShowCrew.cast.map para percorrer o elenco. */}
              {tvShowCredits.cast.map((elenco) => {
                return (
                  <SwiperSlide key={elenco.id} style={{ width: "auto" }}>
                    <li className="grid">
                      <img src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`} alt={`Image of ${elenco.original_name} that represents ${elenco.character}`} width="100" />
                      <span>{elenco.original_name}</span>
                      <span> as </span>
                      <span>{elenco.character}</span>
                    </li>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </ul>
        </div>

        {/* equipe */}
        <h2>Crew</h2>
        <div className="detail-list">
          <ul>
            <Swiper style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
              modules={[Pagination, Navigation, Mousewheel]}
              grabCursor={true} //permite agarrar e arrastar 
              mousewheel={{ forceToAxis: true }} // faz movimento scroll horizontal
              spaceBetween={50}
              slidesPerView="auto"
              className="mySwiper" >


              {Object.entries(groupedCrew).map(([name, info]) => {
                return (
                  <SwiperSlide key={name} style={{ width: "auto" }}>
                    <li className="grid">
                      <span>{name}</span>
                      <br />
                      <span>{info.department}:</span>
                      <span>{info.jobs.join(", ")}</span>
                    </li>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </ul>
        </div>
      </section>
    </>
  );
}

export default TvShowList_Detail;
