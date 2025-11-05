import { useData } from "../hooks/useData";
import CardContent from "./CardContent";
import { Link } from "react-router";
import StarRatingSingle from "./StarRatingSingle";
import { useFilteredData } from "../hooks/useFilteredData";
import { useOutletContext } from "react-router";
import { CardSlider } from "./CardSlider";
import { ContentSection } from "./ContentSection";
import "./ContentSection.scss";




function MoviesList() {
  const { searchValue } = useOutletContext(); // pega o valor do Search


  const { items: inExibition, isLoading } = useData("movie/upcoming");
  const { items: popularMovie } = useData("movie/popular");
  const { items: topRatedMovie } = useData("movie/top_rated");
  const { items: playingMovie } = useData("movie/now_playing");




  // Busca global — combina todos os arrays
  const filteredGlobal = useFilteredData(
    [inExibition, popularMovie, topRatedMovie, playingMovie],
    searchValue,
    "title", { waitAll: true, treatEmptyAsLoaded: true }

  );



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
              <Link key={item.id} to={`/${item.title ? "moviedetail" : ""}/${item.id}`}>
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
          <ContentSection title="In Exibition" items={inExibition} type="movie" />
          <ContentSection title="Popular Movies" items={popularMovie} type="movie" />
          <ContentSection title="Top Rated Movies" items={topRatedMovie} type="movie" />
          <ContentSection title="Now Playing" items={playingMovie} type="movie" />

        </section>
      )}
    </>
  );
}

export default MoviesList;
