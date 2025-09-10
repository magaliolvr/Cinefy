import { Parallax, Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useParams, useState } from "react";
import { useData } from "../hooks/useData";
import { Link } from "react-router";
import "./Home.scss";
import "swiper/css"; //sempre necessario ao usar swiper

function Home() {
  const { items: inExibition, isLoading } = useData("movie/upcoming");
  // Swiper autoplay
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    // Não é necessário retornar JSX aqui
  };

  return (
    <>
      <h1>Estréias</h1>
      <section className="homePage-section">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          modules={[Parallax, Navigation, Pagination, Autoplay, A11y]} //modules: https://swiperjs.com/react#controller
          navigation
          parallax={true}
          pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 2500,
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
    </>
  );
}

export default Home;
