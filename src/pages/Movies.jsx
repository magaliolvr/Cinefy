import MoviesList from "../components/MoviesList";

function Movies() {
  return (
    <>
      {/* adicionar algum componente para titulo */}
      <h1>Movies</h1>
      <section className="flex-wrap">
        {/* adionar algum componente para galeria */}
        <MoviesList />
      </section>
    </>
  );
}
export default Movies;
