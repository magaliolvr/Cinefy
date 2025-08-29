import GlassCard from "./GlassCard";
import React from "react";

function ContentCard({ poster, title, year }) {
  return (
    <GlassCard>
      <div className="flex-column flex-center">
        <img src={poster} alt={title} />
        <h1>{title}</h1>
        <span>{year}</span>
      </div>
    </GlassCard>
  );
}

export default ContentCard;
