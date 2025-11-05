import { CardSlider } from "./CardSlider";
import CardContent from "./CardContent";
import StarRatingSingle from "./StarRatingSingle";
import { Link } from "react-router";


// ContentSection é um componente genérico para renderizar seções de conteúdo (filmes ou séries)

export function ContentSection({ title, items = [], type = "movie" }) {
    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <>
            <h3>{title}</h3>
            <CardSlider items={items} type={type}>
                {(item) => (
                    <Link key={item.id} to={`/${type}detail/${item.id}`}>
                        <CardContent
                            poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            title={type === "movie" ? item.title : item.name}
                            year={(item.release_date || item.first_air_date)?.split("-")[0]}
                            rating={<StarRatingSingle rating={item.vote_average} />}
                        />
                    </Link>
                )}
            </CardSlider>
        </>
    );
}

