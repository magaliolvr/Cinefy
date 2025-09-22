import { SwiperSlide } from "swiper/react";
import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { Swiper } from "swiper/react";
import StarRating from "./StarRating";


// estilos obrigatórios do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MoviesListDetail() {
  const { movieId } = useParams();

  const { items: movie, isLoading: loadingMovie } = useData(`movie/${movieId}`);
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
          <p><strong>Genre:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <StarRating rating={movie.vote_average} />
          <div className="flex-column gap-s">
            <strong>Release Date:</strong> {movie.release_date}
            <strong>Runtime:</strong> {movie.runtime} minutes
          </div>
        </div>
      </div>

      {/* Cast */}
      <h3>Cast</h3>
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

            {credits.cast.map(elenco => {
              return (
                <SwiperSlide key={elenco.cast_id} style={{ width: "auto" }}>
                  <li className="grid">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`}
                      alt={`${elenco.original_name} as ${elenco.character}`}
                      width={100}
                    />
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

      {/* Crew */}
      <h3>Crew</h3>
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
            {Object.entries(groupedCrew).map(([name, info]) => {
              return (
                <SwiperSlide key={name} style={{ width: "auto" }}>
                  <li className="grid">
                    <span>{name}</span>
                    <br />
                    <span>{info.department}: {info.jobs.join(", ")}</span>
                  </li>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </ul>
      </div>
    </section>
  );
}

export default MoviesListDetail;
