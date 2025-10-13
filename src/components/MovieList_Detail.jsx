import { SwiperSlide } from "swiper/react";
import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import StarRating from "./StarRating";


// estilos obrigatórios do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardSlider } from "./CardSlider";

function MoviesListDetail() {
  const { movieId } = useParams();

  const { items: movie, isLoading: loadingMovie } = useData(`movie/${movieId}`);
  const { items: images, isLoading: loadingImages } = useData(`movie/${movieId}/images`);
  const { items: credits, isLoading: loadingCredits } = useData(`movie/${movieId}/credits`);

  console.log("Movie image:", images);

  if (loadingMovie || loadingImages || loadingCredits) return <p>Carregando filmes...</p>; //se loadingMovie for true ou loadingCredits for true, retorna a mensagem de carregando filmes.
  if (!movie || !images || !credits) return <p>Nenhum detalhe encontrado.</p>; //se movie for null ou undefined, ou credits for null ou undefined, retorna a mensagem de nenhum detalhe encontrado.

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
      <CardSlider items={credits.cast} imageShape="round">
        {(elenco) => (
          <>
            <img src={`https://image.tmdb.org/t/p/w500${elenco.profile_path}`} alt={elenco.name} />
            <span>{elenco.name}</span>
            <span> as </span>
            <span>{elenco.character}</span>
          </>

        )}

      </CardSlider>

      {/* Crew */}
      <h3>Crew</h3>
      <CardSlider items={Object.entries(groupedCrew)}  >
        {([name, info]) => (
          <>
            {/* children */}
            <span>{name}</span>
            <br />
            <span>{info.department}: {info.jobs.join(", ")}</span>
          </>
        )}
      </CardSlider>
    </section>
  );
}

export default MoviesListDetail;
