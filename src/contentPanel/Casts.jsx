import React from "react";
import placeholder from "../images/profile-placeholder.png";

export default function Casts({ casts }) {
  if (casts.length === 0) {
    return <span>...</span>;
  }

  return (
    <ul className="castlist">
      {casts.map(cast => (
        <li key={cast.cast_id}>
          <figure>
            <img
              src={
                cast.profile_path != null
                  ? `${process.env.REACT_APP_IMG}/w185${cast.profile_path}`
                  : placeholder
              }
              alt={cast.name}
            />
            <figcaption>
              <strong>{cast.name}</strong> as <strong>{cast.character}</strong>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
