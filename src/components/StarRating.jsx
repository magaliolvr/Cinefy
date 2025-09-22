import { BsStarFill, BsStarHalf } from "react-icons/bs";

function StarRating({ rating }) {

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

export default StarRating;





// como usar


// import { useEffect, useState } from "react";
// import { options } from "../../utils";
// import StarRating from "../StarRating/StarRating";
// import Button from "../Buttons/Buttons";

// export default function FeaturedMovie({ type = "movie", position = 0 }) {
//   const [list, setList] = useState([]);
//   const [topItem, setTopItem] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Get popular list and choose the best rated item
//   useEffect(() => {
//     async function loadPopular() {
//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/${type}/popular`,
//           options
//         );
//         const json = await res.json();
//         const results = Array.isArray(json.results) ? json.results : [];
//         setList(results);

//         // pick the best rated item (make a copy before sorting)
//         const best = results.length
//           ? results.sort((a, b) => b.vote_average - a.vote_average)[position]
//           : null;
//         setTopItem(best);
//       } catch (e) {
//         console.log("error", e);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadPopular();
//   }, [type]);

//   // Fetch the top item full details
//   useEffect(() => {
//     if (!topItem) return;

//     async function loadDetails() {
//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/${type}/${topItem.id}`,
//           options
//         );
//         const json = await res.json(); // this is a single object
//         setDetails(json);
//       } catch (e) {
//         console.log("error", e);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadDetails();
//   }, [topItem, type]);

//   if (!topItem) {
//     return <div>{isLoading ? "Loading…" : "No data yet"}</div>;
//   }

//   return (
//     <div
//       className="featured"
//       style={{
//         backgroundImage: `
//           linear-gradient(to top, #09090b, transparent),
//           url(https://image.tmdb.org/t/p/w1280/${topItem.backdrop_path})`,
//         backgroundSize: "cover",
//         backgroundPosition: "top",
//         width: "100%",
//       }}
//     >
//       <div className="featured-content">
//         <div className="featured-categories">
//           <span className="pill pill-red pill--sm">Featured</span>
//           {details?.genres.slice(0, 3).map((genre) => {
//             return (
//               <span className="pill pill-transparent pill--sm" key={genre.id}>
//                 {genre.name}
//               </span>
//             );
//           })}
//         </div>
//         <h1>{topItem.title}</h1>
//         <p>{topItem.overview}</p>
//         <div className="featured-metadata">
//           <p>{topItem.release_date.slice(0, 4)}</p>
//           <p>·</p>
//           <StarRating rating={topItem.vote_average} />
//         </div>
//       </div>

//       <div className="featured-actions">
//         <Button type="white" size="md">
//           Learn more
//         </Button>
//       </div>
//     </div>
//   );
// }