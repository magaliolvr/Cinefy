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
            <Link key={serie.id} to={`/tvshowdetail/${serie.id}`}>
              {" "}
              {/* to dinamico sempre vai ser composto por caminho da pagina + ${serie.id} que corresponde ao id unico do conteudo que vai ser acessado */}
              <ContentCard poster={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} title={serie.name} year={serie.first_air_date?.split("-")[0]} />{" "}
              {/* ?.split("-")[0] esta dizendo que = o valor que vier do ano (que sei que sera ano-mes-dia) quero que parta sempre onde tiver o "-", o js entao parte em 3 e os separa e organiza em um array, entao o [0] esta me trazendo a posição 0 do array*/}
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
