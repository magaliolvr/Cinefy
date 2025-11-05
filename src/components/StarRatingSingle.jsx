import { BsStarFill } from "react-icons/bs";
import "./StarRating.scss";

function StarRatingSingle({ rating }) {
    return (
        <div className="star-rating star-rating-single">
            <BsStarFill className="single-star" />
            <span className="rating-number">{rating?.toFixed(1)}</span>
        </div>
    );
}

export default StarRatingSingle;
