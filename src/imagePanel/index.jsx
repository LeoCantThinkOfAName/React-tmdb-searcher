import React from "react";
import { MovieConsumer } from "../components/MovieContext";
import DotLoader from "react-spinners/DotLoader";

export default function ImagePanel() {
  return (
    <MovieConsumer>
      {({ movie }) => {
        if (movie.poster_path === undefined) {
          return (
            <div className="imagepanel">
              <dir className="loader-wrapper">
                <DotLoader size={150} color={"red"} />
              </dir>
            </div>
          );
        }

        return (
          <div className="imagepanel">
            <picture>
              <source
                media="(min-width: 1000px)"
                srcSet={`${process.env.REACT_APP_IMG}/original${
                  movie.poster_path
                }`}
              />
              <source
                media="(min-width: 800px)"
                srcSet={`${process.env.REACT_APP_IMG}/w500${movie.poster_path}`}
              />
              <img
                src={`${process.env.REACT_APP_IMG}/w342${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
              />
            </picture>
          </div>
        );
      }}
    </MovieConsumer>
  );
}
