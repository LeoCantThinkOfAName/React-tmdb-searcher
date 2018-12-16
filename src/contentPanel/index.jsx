import React from "react";
import Moment from "react-moment";
import { MovieConsumer } from "../components/MovieContext";
import { withNamespaces } from "react-i18next";
import Genres from "./Genres";
import Casts from "./Casts";

function ContentPanel({ t }) {
  return (
    <MovieConsumer>
      {({ movie, casts }) => (
        <div className="contentpanel">
          <article>
            <header>
              <h1>{movie.title}</h1>
              <div>
                <strong>{t("Release Date")}: </strong>
                <Moment
                  date={movie.release_date}
                  format="MM/DD/YYYY"
                  withTitle
                />
              </div>
              <div>
                <strong>{t("Genres")}: </strong>
                <Genres genres={movie.genres} />
              </div>
            </header>
            <main>
              <h2>{t("Overview")}: </h2>
              <div>
                {movie.overview === "" ? t("Not Available") : movie.overview}
              </div>
            </main>
            <footer>
              <h2>{t("Cast")}:</h2>
              <Casts casts={casts} />
            </footer>
          </article>
        </div>
      )}
    </MovieConsumer>
  );
}

export default withNamespaces()(ContentPanel);
