import "./HeroSection.scss";

function HeroSection({ url, alt, title, description, children }) {

    return <>
        <section className="heroSection">
            <div className="image-wrapper">
                <img src={url} alt={alt} />
            </div>
            <div className="content-wrapper">
                <h1 className="title">{title}</h1>
                <p className="description">{description}</p>
                <div className="actions">
                    {children}
                </div>
            </div>
        </section>
    </>
}

export default HeroSection;