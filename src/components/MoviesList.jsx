import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";

function MoviesList() {
  const { items: movies, isLoading } = useData("movie/popular");

  if (isLoading) {
    return <p>Carregando filmes...</p>;
  }

  return (
    <>
      {Array.isArray(movies) ? (
        movies.map((movie) => {
          return (
            <Link key={movie.id} to={`/moviedetail/${movie.id}`}>
              <ContentCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} year={movie.release_date?.split("-")[0]} />
              {/* ?.split parte o conteudo que recebe em um array, o que separa é o item que esta entre parenteses, e pra usar deste array, basta no parenteses retos colocar a posição que deseja mostrar */}
            </Link>
          );
        })
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </>
  );
}

export default MoviesList;
