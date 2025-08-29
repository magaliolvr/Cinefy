import GlassCard from "../components/GlassCard";
import MoviesList from "../components/MoviesList";

function Movies() {
  return (
    <div>
      <h1>Movies</h1>
      <section className="flex-wrap">
        <MoviesList />
      </section>
    </div>
  );
}
export default Movies;
