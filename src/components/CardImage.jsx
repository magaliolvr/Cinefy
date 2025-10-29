import "./CardImage.scss"

function CardImage({
    url,
    imageShape = "square", // "square" ou "round"
    imgClassName,
    title,
    subtitle
}) {
    console.log("CardImage props:", { url, title, subtitle });
    return <>
        <div className={`cardImage ${imageShape}`}>
            <img src={url} alt={title + subtitle} className={imgClassName} />
            <span className="cardImage-title">{title}</span>
            <span className="cardImage-subtitle">{subtitle}</span>
        </div>
    </>
}

export default CardImage;