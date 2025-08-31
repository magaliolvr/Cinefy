import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";

function TvShowList() {
  const { items: tvShow, isLoading } = useData("tv/popular");

  if (isLoading) {
    return <p>Carregando filmes...</p>;
  }

  return (
    <>
      {Array.isArray(tvShow) ? (
        tvShow.map((serie) => {
          return (
            <Link key={serie.id}>
              <ContentCard poster={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} title={serie.title} date={serie.release_date} />
            </Link>
          );
        })
      ) : (
        <p>Nenhuma série encontrada.</p>
      )}
    </>
  );
}

export default TvShowList;
