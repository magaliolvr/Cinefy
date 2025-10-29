import { useData } from "../hooks/useData";
import { useParams } from "react-router";
import StarRating from "./StarRating";
import TabContent from "./TabNavigation";
import "./HeroSection.scss";
import DummyImage from "../assets/dummy_Img.png";
import CardImage from "./CardImage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardSlider } from "./CardSlider";
import HeroSection from "./HeroSection";
import TabNavigation from "./TabNavigation";

// Constantes ou funções auxiliares (no topo)
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMG = DummyImage;

function getProfileImage(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : PLACEHOLDER_IMG;
}

function MoviesListDetail() {
  const { movieId } = useParams();

  // Hooks e requisições
  const { items: movie, isLoading: loadingMovie } = useData(`movie/${movieId}`);
  const { items: images, isLoading: loadingImages } = useData(`movie/${movieId}/images`);
  const { items: credits, isLoading: loadingCredits } = useData(`movie/${movieId}/credits`);

  if (loadingMovie || loadingImages || loadingCredits) return <p>Carregando filmes...</p>;

  if (!movie || !images || !credits) return <p>Nenhum detalhe encontrado.</p>;

  // Agrupa crew por pessoa (antes do return)
  const groupedCrew = {};
  credits.crew.forEach((member) => {
    const name = member.name;
    if (!groupedCrew[name]) {
      groupedCrew[name] = { department: member.department, jobs: [member.job] };
    } else if (!groupedCrew[name].jobs.includes(member.job)) {
      groupedCrew[name].jobs.push(member.job);
    }
  });

  // Defini as abas dinamicamente (antes do return)
  const tabs = [
    // Sinopse 
    {
      id: "synopsis",
      title: "Synopsis",
      content: (
        <div className="tab-synopsis">
          <p>{movie.overview}</p>

          {/* Cast */}
          <h3>Cast</h3>
          <CardSlider items={credits.cast} imageShape="round">
            {(elenco) => (
              <>
                <CardImage imgClassName={!elenco.profile_path ? "placeholder" : ""} url={getProfileImage(elenco.profile_path)} imageShape="round" title={elenco.name || "Unknown Actor"} subtitle={`as ${elenco.character}`} />
              </>
            )}
          </CardSlider>
        </div>
      ),
    },

    // Crew
    {
      id: "crew",
      title: "Crew",
      content: (
        <div className="tab-cast-crew">
          {/* Crew */}
          <h3>Crew</h3>
          <CardSlider items={Object.entries(groupedCrew)}>
            {([name, info]) => (
              <>
                <CardImage imgClassName={"placeholder"} url={getProfileImage(null)} imageShape="round" title={name} subtitle={`${info.department}: ${info.jobs.join(", ")}`} />
              </>
            )}
          </CardSlider>
        </div>
      ),
    },
  ];

  //  Render final
  return (
    <section className="movie-detail-page">
      {/* Hero Section */}
      <HeroSection
        url={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
        alt={movie.title}
        title={
          movie.title +
          (movie.release_date ? ` (${movie.release_date.split("-")[0]})` : "")
        }
        description={movie.genres.map((g) => g.name).join(", ")}
      >
        <button>Play</button>
      </HeroSection>

      {/* Tabs dinâmicas */}
      <TabNavigation tabs={tabs} />
    </section>
  );
}

export default MoviesListDetail;
