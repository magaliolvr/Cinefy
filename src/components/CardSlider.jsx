import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./CardSlider.scss";


export function CardSlider({
    items = [],
    spaceBetween = 50,
    slidesPerView = "auto",
    imageShape = "square", // "square" ou "round"
    children,
}) {
    return (
        <div className="card-slider">
            <ul>
                <Swiper
                    modules={[Pagination, Mousewheel]}
                    grabCursor
                    mousewheel={{ forceToAxis: true }}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    className="mySwiper"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={item.id || index} style={{ width: "auto" }}>
                            <li className={`grid ${imageShape}`}>
                                {typeof children === "function"
                                    ? children(item, imageShape) // 👈 passa o formato pro filho se quiser
                                    : children}
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ul>
        </div>
    );
}
