import { useData } from "../hooks/useData";
import CardContent from "./CardContent";
import { Link } from "react-router-dom";
import { useFilteredData } from "../hooks/useFilteredData";
import { useOutletContext } from "react-router-dom";
import StarRatingSingle from "./StarRatingSingle";
import { CardSlider } from "./CardSlider";
import { ContentSection } from "./ContentSection";
import "./ContentSection.scss";

function TvShowList() {
  const { searchValue } = useOutletContext(); // pega o valor do Search

  const { items: popularTv } = useData("tv/popular");
  const { items: topRatedTv } = useData("tv/top_rated");
  const { items: playingTv } = useData("tv/on_the_air");


  // Busca global — combina todos os arrays
  const filteredGlobal = useFilteredData(
    [popularTv, topRatedTv, playingTv],
    searchValue,
    "title", { waitAll: true, treatEmptyAsLoaded: true }

  );


  // Se há busca ativa, mostra apenas resultados combinados
  if (searchValue) {
    if (!filteredGlobal.length) {
      return <p className="no-results">Nenhum resultado encontrado.</p>;
    }

  }


  return (
    <>
      {searchValue ? (
        <section className="content-section">
          <h3>Resultados da busca</h3>
          <CardSlider items={filteredGlobal}>
            {(item) => (
              <Link key={item.id} to={`/${item.title ? "tvdetail" : ""}/${item.id}`}>
                <CardContent
                  poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  title={item.title || item.name}
                  rating={<StarRatingSingle rating={item.vote_average} />}
                  year={item.release_date.split("-")[0]}
                />
              </Link>
            )}
          </CardSlider>
        </section>
      ) : (
        <section className="content-section">
          <ContentSection title="Popular TV Shows" items={popularTv} type="tvShow" />
          <ContentSection title="Top Rated TV Shows" items={topRatedTv} type="tvShow" />
          <ContentSection title="Currently Airing" items={playingTv} type="tvShow" />

        </section>
      )}
    </>
  );
}

export default TvShowList;
