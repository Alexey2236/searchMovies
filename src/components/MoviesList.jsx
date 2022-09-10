import React from "react";
import { Movie } from "./Movie";
import { MovieDescr } from "./MovieDescr";

class MoviesList extends React.Component {
  state = {
    descrMovie: null,
    open: false,
    loading: false,
  };

  getDescrMovie = (id) => {
    fetch(`https://www.omdbapi.com/?apikey=8d34edf&i=${id}`)
      .then((res) => res.json())
      .then((data) => this.setState({ open: true, descrMovie: data })
      )
      .catch((err) => {
        console.error(err)
      })
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { movies = [] } = this.props;
    const { open, descrMovie } = this.state;

    return (
      <div className="movies">
        {open ? (
          <MovieDescr closeModal={this.closeModal} descrMovie={descrMovie} />
        ) : null}
        {movies.length ? (
          movies.map((movie) => {
            return (
              <Movie
                getDescrMovie={this.getDescrMovie}
                key={movie.imdbID}
                {...movie}
              />
            );
          })
        ) : (
          <h4 className="not-search">Nothing found</h4>
        )}

        
      </div>
    );
  }
}

export { MoviesList };
