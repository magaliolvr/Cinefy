import React from "react";
import Logo from "../assets/cinefy.png";
import GlassCard from "../components/GlassCard";
import { useData } from "../hooks/useData";
import { Link } from "react-router";
import ContentCard from "../components/ContentCard";

function Home() {
  const { items: inExibition, isLoading } = useData("movie/upcoming");

  if (isLoading) {
    return <p>Caregando filmes...</p>;
  }

  return (
    <>
      <h1>Estréias</h1>
      {Array.isArray(inExibition) ? (
        inExibition.map((movie) => {
          return (
            <Link key={movie.id} to={`/moviedetail/${movie.id}`}>
              <ContentCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} year={movie.release_date?.split("-")[0]} />
            </Link>
          );
        })
      ) : (
        <p>nenhum filme a ser mostrado</p>
      )}
    </>
  );
}

export default Home;
