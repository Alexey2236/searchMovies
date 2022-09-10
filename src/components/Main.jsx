import React from "react";
import { MoviesList } from "../components/MoviesList";
import { Spiner } from "../components/Spiner";
import { Search } from "./Search";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
      page: 2,
      amountMovie: 0,
    };
    let movieName;
    let movieType;
  }

  componentDidMount() {
    fetch("https://www.omdbapi.com/?apikey=8d34edf&s=terminator&page=1")
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }))
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  searchMuvies = (value, type = "all") => {
    if (!value) return;
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?apikey=8d34edf&s=${value}&page=1${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
          loading: false,
          amountMovie: data.totalResults,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

    this.movieName = value;
    this.movieType = type;
  };

  loadMore = (value, type) => {
    if (!value) return;
    this.setState({ loading: true });
    fetch(
      `https://www.omdbapi.com/?apikey=8d34edf&s=${value}&page=${this.state.page}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState(({ movies }) => {
          return {
            movies: movies.concat(data.Search),
            loading: false,
          };
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });

    this.setState({ page: +this.state.page + 1 });
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <main className="content container">
        <Search searchMuvies={this.searchMuvies} />

        {loading ? <Spiner /> : <MoviesList movies={movies} />}

        <button
          className="btn waves-effect waves-light load"
          type="submit"
          name="action"
          onClick={() => this.loadMore(this.movieName, this.movieType)}
          disabled={
            !this.movieName ||
            !this.state.movies ||
            +this.state.amountMovie === this.state.movies.length
              ? true
              : false
          }
        >
          load More
        </button>
      </main>
    );
  }
}

export { Main };
