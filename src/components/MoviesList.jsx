import { useData } from "../hooks/useData";
import ContentCard from "./ContentCard";
import { Link } from "react-router";
import StarRating from "./StarRating";
import { useFilteredData } from "../hooks/useFilteredData";
import { useOutletContext } from "react-router";



function MoviesList() {
  const { searchValue } = useOutletContext(); // pega o valor do Search
  const { items: movies, isLoading } = useData("movie/popular");


  if (!movies || isLoading) return <p>Carregando filmes...</p>;

  const filteredMovies = useFilteredData(movies, searchValue, "title");


  return (
    <>
      {Array.isArray(filteredMovies) ? (
        filteredMovies.map((movie) => {
          return (
            <Link key={movie.id} to={`/moviedetail/${movie.id}`}>
              {" "}
              <ContentCard
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                year={movie.release_date?.split("-")[0]}
                rating={<StarRating rating={movie.vote_average} />}
              />{" "}
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
