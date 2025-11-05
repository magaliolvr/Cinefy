
import "./CardContent.scss";

function CardContent({ poster, title, year, rating }) {
  console.log("qual titulo e ano: ", title, year);
  return (
    <div className="card-content ">
      <div className="image-wrapper">
        <img src={poster} alt={`${title} poster`} />
      </div>
      <h1 className="title" title={title}>{title}</h1> {/* o atributo title adiciona tooltip nativamente*/}
      <div className="additional-info ">
        <div>{rating}</div>
        <div>{year}</div>
      </div>
    </div>
  );
}

export default CardContent;
