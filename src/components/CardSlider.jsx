import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./CardSlider.scss";
import CardImage from "./CardImage";


export function CardSlider({
    items = [],
    spaceBetween = 16,
    slidesPerView = "auto",
    children
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
                            <li>
                                {typeof children === "function" ? children(item, index) : children}
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ul>
        </div>
    );
}
