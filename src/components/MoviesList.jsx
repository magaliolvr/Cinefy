import React from "react";
import { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import ContentCard from "./ContentCard";
import { Link } from "react-router";

function MoviesList() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE", // Replace with your Bearer token
        },
      };

      setIsLoading(true);

      try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular`, options);
        const newMoviesList = await data.json();
        console.log("new movies list", newMoviesList);
        setMovies(newMoviesList.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {movies.map((movie) => {
        return (
          <Link key={movie.id}>
            <ContentCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} date={movie.release_date} />
          </Link>
        );
      })}
    </>
  );
}

export default MoviesList;
