import React from "react";
import { MoviesList } from "../components/MoviesList";
import { Spiner } from "../components/Spiner";
import { Search } from "./Search";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      movies: [],
      loading: true,
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
    this.setState({page : 1})

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
      );

    this.movieName = value;
    this.movieType = type;
  };

  nextPage = (value, type) => {
    this.setState({ page: +this.state.page + 1 });
    this.setState({ loading: true });

    fetch(
      `https://www.omdbapi.com/?apikey=8d34edf&s=${value}&page=${
        this.state.page + 1
      }${type !== "all" ? `&type=${type}` : ""}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState((movies) => {
          return {
            movies: data.Search,
            loading: false,
          };
        })
      );
  };

  prevPage = (value, type) => {
    this.setState({ page: +this.state.page - 1 });
    this.setState({ loading: true });

    fetch(
      `https://www.omdbapi.com/?apikey=8d34edf&s=${value}&page=${
        this.state.page - 1
      }${type !== "all" ? `&type=${type}` : ""}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState((movies) => {
          return {
            movies: data.Search,
            loading: false,
          };
        })
      );
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <main className="content container">
        <Search searchMuvies={this.searchMuvies} />

        {loading ? <Spiner /> : <MoviesList movies={movies} />}

        <div className="navigation">
          <button
            className="prev btn"
            onClick={() => this.prevPage(this.movieName, this.movieType)}
            disabled={
              !this.movieName || !this.state.movies || this.state.page === 1
                ? true
                : false
            }
          >
            Prev page
          </button>
          <button
            className="next btn"
            onClick={() => this.nextPage(this.movieName, this.movieType)}
            disabled={
              !this.movieName ||
              !this.state.movies ||
              +this.state.page === Math.ceil(+this.state.amountMovie / 10)
                ? true
                : false
            }
          >
            Next page
          </button>
        </div>
      </main>
    );
  }
}

export { Main };
