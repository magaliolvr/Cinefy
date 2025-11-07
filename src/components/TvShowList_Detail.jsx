import { useData } from "../hooks/useData";
import { useParams } from "react-router-dom";
import "../style/utils.scss";

// estilos obrigatórios do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DummyImage from "../assets/dummy_Img.png"
import { CardSlider } from "./CardSlider";
import HeroSection from "./HeroSection";
import TabNavigation from "./TabNavigation";
import CardImage from "./CardImage";

// Constantes e helpers
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMG = DummyImage;

function getProfileImage(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : PLACEHOLDER_IMG;
}

function TvShowList_Detail() {
  const { tvShowId } = useParams();
  const { items: tvShow, isLoading: loadingTvShow } = useData(`tv/${tvShowId}`);
  const { items: tvShowCredits, isLoading: loadingTvCredits } = useData(`tv/${tvShowId}/credits`);

  if (loadingTvShow || loadingTvCredits) return <p>Carregando séries...</p>;
  if (!tvShow || !tvShowCredits) return <p>Nenhum série encontrada</p>;

  // Agrupar crew
  const groupedCrew = {};
  tvShowCredits.crew.forEach(member => {
    const name = member.name;
    if (!groupedCrew[name]) {
      groupedCrew[name] = { department: member.department, jobs: [member.job] };
    } else if (!groupedCrew[name].jobs.includes(member.job)) {
      groupedCrew[name].jobs.push(member.job);
    }
  });

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="tab-synopsis">
          <p>{tvShow.overview}</p>

          <h3>Cast</h3>
          <CardSlider items={tvShowCredits.cast} imageShape="round">
            {(elenco) => (
              <>
                <CardImage imgClassName={!elenco.profile_path ? "placeholder" : ""} url={getProfileImage(elenco.profile_path)} imageShape="round" title={elenco.name || "Unknown Actor"} subtitle={`as ${elenco.character}`} />
              </>
            )}
          </CardSlider>
        </div>
      ),
    },
    {
      id: "crew",
      title: "Crew",
      content: (
        <div className="tab-cast-crew">
          <h3>Crew</h3>
          <CardSlider items={Object.entries(groupedCrew)} >
            {([name, info]) => (
              <CardImage imgClassName={"placeholder"} url={getProfileImage(null)} imageShape="round" title={name} subtitle={`${info.department}: ${info.jobs.join(", ")}`} />
            )}
          </CardSlider>
        </div>
      ),
    },
  ];

  return (
    <section>
      <HeroSection
        url={`${IMAGE_BASE_URL}${tvShow.backdrop_path}`}
        alt={tvShow.name}
        title={`${tvShow.name}${tvShow.first_air_date ? ` (${tvShow.first_air_date.split("-")[0]})` : ""}`}
        description={tvShow.genres.map((genre) => genre.name).join(", ")}
      >
        <button>Play</button>
      </HeroSection>

      <TabNavigation tabs={tabs} />
    </section>
  );
}

export default TvShowList_Detail;
