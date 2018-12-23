import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Moment from "react-moment";
import placeholder from "../../images/profile-placeholder.png";

export default function SearchResults({ results, term, handleClick }) {
  let pattern = new RegExp(term, "gi");

  return (
    <TransitionGroup component={"ul"}>
      {results.map(movie => {
        return (
          <CSSTransition key={movie.id} timeout={800} classNames="flip">
            <li>
              <div
                className="card"
                style={{
                  backgroundImage: !movie.backdrop_path
                    ? `url(${placeholder})`
                    : `url(${process.env.REACT_APP_IMG}/w300${
                        movie.backdrop_path
                      })`,
                }}
                onClick={() => handleClick(movie.id)}
              >
                <div className="card-mask">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: movie.title.replace(pattern, match => {
                        return `<b>${match}</b>`;
                      }),
                    }}
                  />
                  &nbsp;
                  <span>
                    (
                    <Moment date={movie.release_date} format="YYYY" withTitle />
                    )
                  </span>
                  <div className="card-overview">{movie.overview}</div>
                </div>
              </div>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
