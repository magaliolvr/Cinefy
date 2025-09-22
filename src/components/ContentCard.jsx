import GlassCard from "./GlassCard";
import React from "react";

function ContentCard({ poster, title, year, rating }) {
  console.log("qual titulo e ano: ", title, year);
  return (
    <GlassCard>
      <div className="flex-column flex-center">
        <img src={poster} alt={title} />
        <h1>{title}</h1>
        <div>{year}</div>
        <div>{rating}</div>
      </div>
    </GlassCard>
  );
}

export default ContentCard;
