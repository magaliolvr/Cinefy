import { Parallax, Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import React, { useRef } from "react";
import { useData } from "../hooks/useData";
import { Link } from "react-router";
import "./HomeList.scss";
import "swiper/css"; //sempre necessario ao usar swiper
import { useOutletContext } from "react-router";
import { useFilteredData } from "../hooks/useFilteredData";
import ContentCard from "./ContentCard";
import StarRating from "./StarRating";
import { ContentSection } from "./ContentSection";

//cardSlider
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardSlider } from "./CardSlider";


export function HomeList() {
    const { searchValue } = useOutletContext(); // pega o valor do Search
    const { items: inExibition, isLoading } = useData("movie/upcoming");
    // movies
    const { items: popularMovie, isLoading: isLoadingPopular } = useData("movie/popular");
    const { items: topRatedMovie } = useData("movie/top_rated");
    const { items: playingMovie } = useData("movie/now_playing");

    console.log("popular movie", popularMovie)

    // tv show
    const { items: popularTv } = useData("tv/popular");
    const { items: topRatedTv } = useData("tv/top_rated");
    const { items: playingTv } = useData("tv/on_the_air");

    const filteredMovies = useFilteredData(popularMovie, searchValue, "title");


    if (isLoading || isLoadingPopular) {
        return <p>Carregando...</p>;
    }

    if (Array.isArray(filteredMovies) && filteredMovies.length === 0) return <p>Nenhum filme encontrado.</p>;


    return (
        <>
            <section className="primary-section">
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    modules={[Parallax, Pagination, Autoplay, A11y]} //modules: https://swiperjs.com/react#controller

                    parallax={true}
                    pagination={{ clickable: true }}
                    // autoplay={{
                    //   delay: 5000,
                    //   disableOnInteraction: false,
                    // }} // autoplay : https://codesandbox.io/p/sandbox/nhtzd5?file=%2Fsrc%2FApp.jsx%3A21%2C9-24%2C11
                    spaceBetween={50}
                    breakpoints={{
                        600: { slidesPerView: 1 },
                        1100: { slidesPerView: 1 },
                    }}
                    className="mySwiper"
                >
                    {Array.isArray(inExibition) ? (
                        inExibition.map((movie) => {
                            return (
                                <SwiperSlide key={movie.id}>
                                    <Link to={`/moviedetail/${movie.id}`}>
                                        <div className="image-wrapper">
                                            <img className="parallax-bg" data-swiper-parallax="-23%" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                                        </div>

                                        <div className="wrap-content-parallax">
                                            <span className="title" data-swiper-parallax="-300">
                                                {movie.title}
                                            </span>
                                            <span className="subtitle" data-swiper-parallax="-200">
                                                {movie.release_date?.split("-")[0]}
                                            </span>
                                            <span className="text" data-swiper-parallax="-100">
                                                {movie.overview}
                                            </span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <p>nenhum filme a ser mostrado</p>
                    )}
                </Swiper>
            </section>
            <section className="content-section">
                <ContentSection title="Popular Movies" items={filteredMovies} type="movie" />
                <ContentSection title="Top Rated Movies" items={topRatedMovie} type="movie" />
                <ContentSection title="Now Playing" items={playingMovie} type="movie" />

                <ContentSection title="Popular TV Shows" items={popularTv} type="tvShow" />
                <ContentSection title="Top Rated TV Shows" items={topRatedTv} type="tvShow" />
                <ContentSection title="Currently Airing" items={playingTv} type="tvShow" />
            </section>
        </>
    );


}