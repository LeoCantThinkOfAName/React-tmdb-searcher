import React, { PureComponent, createContext } from "react";
import Axios from "axios";
import moment from "moment";
import i18n from "../i18n";

const movieContext = createContext();

export class MovieProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movieId: null,
      movie: {},
      lang: "zh-TW",
      casts: [],
      searchTerm: "",
      searchResults: [],
      timeout: null,
      onLangSelect: lang => {
        this.setState({
          lang,
        });
        this.fetchData(this.state.movieId);
        i18n.changeLanguage(lang);
      },
      onInputChange: searchTerm => {
        this.setState({
          searchTerm,
        });

        // set a tiny throttle to stop the crazy requests
        clearTimeout(this.state.timeout);
        this.state.timeout = setTimeout(() => {
          this.searchMovie(searchTerm);
        }, 500);
      },
      onSearchResultClicked: movieId => {
        this.setState({
          searchResults: [],
          searchTerm: "",
        });
        this.fetchData(movieId);
      },
    };

    this.fetchData = movieId => {
      const TillDate = moment().format("YYYY-MM-DD");
      const FromDate = moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD");
      // get the movies around this month
      Axios.get(
        `${
          process.env.REACT_APP_API
        }/discover/movie?primary_release_date.gte=${FromDate}&primary_release_date.lte=${TillDate}&api_key=${
          process.env.REACT_APP_KEY
        }`
      )
        .then(async res => {
          let randomNum = Math.floor(Math.random() * res.data.results.length);
          // since the returned result aren't include the casts and genres details,
          // make another query to get the casts and genres list
          await Axios.get(
            `${process.env.REACT_APP_API}/movie/${
              movieId ? movieId : res.data.results[randomNum].id
            }?api_key=${process.env.REACT_APP_KEY}&language=${this.state.lang}`
          ).then(res => {
            this.setState({
              movieId: res.data.id,
              movie: res.data,
            });
          });

          // get casts (if movieId is not provided, use random id just generated)
          await Axios.get(
            `${process.env.REACT_APP_API}/movie/${
              movieId ? movieId : res.data.results[randomNum].id
            }/credits?api_key=${process.env.REACT_APP_KEY}`
          )
            .then(res => {
              this.setState({
                casts: res.data.cast,
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    };

    this.searchMovie = searchTerm => {
      // if the search term is empty, don't execute.
      if (searchTerm.length === 0) {
        this.setState({
          searchResults: [],
        });
        return;
      }

      Axios.get(
        `${process.env.REACT_APP_API}/search/movie?api_key=${
          process.env.REACT_APP_KEY
        }&language=${this.state.lang}&page=1&query=${this.state.searchTerm}`
      )
        .then(res => {
          this.setState({
            searchResults: res.data.results.slice(0, 5),
            timeout: null,
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <movieContext.Provider value={this.state}>
        {this.props.children}
      </movieContext.Provider>
    );
  }
}

export const MovieConsumer = movieContext.Consumer;
