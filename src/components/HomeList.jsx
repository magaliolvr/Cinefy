import { Parallax, Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useData } from "../hooks/useData";
import { Link } from "react-router";
import "./HomeList.scss";
import "swiper/css";
import "swiper/css/pagination";
import { useOutletContext } from "react-router";
import { useFilteredData } from "../hooks/useFilteredData";
import ContentCard from "./ContentCard";
import StarRating from "./StarRating";
import { ContentSection } from "./ContentSection";
import { CardSlider } from "./CardSlider";
import HeroSection from "./HeroSection";

export function HomeList() {
    const { searchValue } = useOutletContext();

    // Movies
    const { items: inExibition, isLoading } = useData("movie/upcoming");
    const { items: popularMovie } = useData("movie/popular");
    const { items: topRatedMovie } = useData("movie/top_rated");
    const { items: playingMovie } = useData("movie/now_playing");

    // TV
    const { items: popularTv } = useData("tv/popular");
    const { items: topRatedTv } = useData("tv/top_rated");
    const { items: playingTv } = useData("tv/on_the_air");

    // Busca global — combina todos os arrays
    const filteredGlobal = useFilteredData(
        [popularMovie, topRatedMovie, playingMovie, popularTv, topRatedTv, playingTv],
        searchValue,
        "title", { waitAll: true, treatEmptyAsLoaded: true }

    );






    if (isLoading) return <p>Carregando...</p>;

    // Se há busca ativa, mostra apenas resultados combinados
    if (searchValue) {
        if (!filteredGlobal.length) {
            return <p className="no-results">Nenhum resultado encontrado.</p>;
        }

    }


    // Caso não haja busca → layout padrão com seções
    return (
        <>
            {/* HERO - filmes em exibição */}

            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                modules={[Parallax, Pagination, Autoplay, A11y]}
                parallax
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }} // autoplay : https://codesandbox.io/p/sandbox/nhtzd5?file=%2Fsrc%2FApp.jsx%3A21%2C9-24%2C11
                spaceBetween={50}
                breakpoints={{
                    600: { slidesPerView: 1 },
                    1100: { slidesPerView: 1 },
                }}
                className="mySwiper"
            >
                {Array.isArray(inExibition) ? (
                    inExibition.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/moviedetail/${movie.id}`}>
                                <HeroSection
                                    url={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt={movie.title}
                                    title={movie.title}
                                    description={movie.overview}
                                    year={movie.release_date?.split("-")[0]}
                                    rating={<StarRating rating={movie.vote_average} />}
                                >
                                    <button>Play</button>
                                </HeroSection>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Nenhum filme a ser mostrado.</p>
                )}
            </Swiper>

            {searchValue ? (
                <section className="content-section">
                    <h3>Resultados da busca</h3>
                    <CardSlider items={filteredGlobal}>
                        {(item) => (
                            <Link key={item.id} to={`/${item.title ? "moviedetail" : "tvdetail"}/${item.id}`}>
                                <ContentCard
                                    poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    title={item.title || item.name}
                                    year={(item.release_date || item.first_air_date)?.split("-")[0]}
                                    rating={<StarRating rating={item.vote_average} />}
                                />
                            </Link>
                        )}
                    </CardSlider>
                </section>
            ) : (
                <section className="content-section">
                    <ContentSection title="Popular Movies" items={popularMovie} type="movie" />
                    <ContentSection title="Top Rated Movies" items={topRatedMovie} type="movie" />
                    <ContentSection title="Now Playing" items={playingMovie} type="movie" />

                    <ContentSection title="Popular TV Shows" items={popularTv} type="tvShow" />
                    <ContentSection title="Top Rated TV Shows" items={topRatedTv} type="tvShow" />
                    <ContentSection title="Currently Airing" items={playingTv} type="tvShow" />
                </section>
            )}





            {/* SEÇÕES DE CONTEÚDO */}
            {/* <section className="content-section">
                <ContentSection title="Popular Movies" items={popularMovie} type="movie" />
                <ContentSection title="Top Rated Movies" items={topRatedMovie} type="movie" />
                <ContentSection title="Now Playing" items={playingMovie} type="movie" />

                <ContentSection title="Popular TV Shows" items={popularTv} type="tvShow" />
                <ContentSection title="Top Rated TV Shows" items={topRatedTv} type="tvShow" />
                <ContentSection title="Currently Airing" items={playingTv} type="tvShow" />
            </section> */}
        </>
    );
}
