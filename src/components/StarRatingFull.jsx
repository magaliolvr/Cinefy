import { BsStarFill, BsStarHalf } from "react-icons/bs";

function StarRatingFull({ rating }) {

    const roundedRating = Math.round(rating) / 2; // arredonda a classificação para o número inteiro mais próximo e divide por 2 (para converter de escala de 10 para escala de 5)

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (roundedRating >= i) {
            stars.push(<BsStarFill key={i} />);
        } else if (roundedRating >= i - 0.5) {
            stars.push(<BsStarHalf key={i} />);
        }
    } // loop de 1 a 5 para criar as estrelas (total de 5 estrelas), se a classificação arredondada for maior ou igual ao número da estrela, adiciona uma estrela cheia, se for maior ou igual a número da estrela menos 0.5, adiciona uma meia estrela

    return <div className="star-rating">
        {stars}
    </div>;
}

export default StarRatingFull;