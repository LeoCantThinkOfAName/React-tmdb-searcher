import React from "react";

export default function Genres({ genres }) {
  if (genres === undefined) {
    return <span>...</span>;
  }

  if (genres.length === 0) {
    return <span />;
  }

  return (
    <ul className="genrelist">
      {genres.map(genre => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
}
