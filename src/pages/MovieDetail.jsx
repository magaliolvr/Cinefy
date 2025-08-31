import MoviesList_Detail from "../components/MovieList_Detail";
import { useParams } from "react-router";

function MoviesDetail() {
  return (
    <>
      {/* adicionar algum componente para titulo */}
      <h1>Movie detail</h1>
      <section className="flex-wrap">
        {/* adionar algum componente para galeria */}
        <MoviesList_Detail />
      </section>
    </>
  );
}
export default MoviesDetail;
