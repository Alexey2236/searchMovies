function Movie(props) {
  const { Title, Year, imdbID, Poster, Type, getDescrMovie } = props;

  return (
    <div
      onClick={() => getDescrMovie(imdbID)}
      id={imdbID}
      className="card movie"
    >
      <div className="card-image waves-effect waves-block waves-light movie-item">
        {Poster === "N/A" ? (
          <img
            className="activator"
            src={`https://via.placeholder.com/500x400?text=${Title}` }
         alt='' />
        ) : (
          <img className="activator" src={Poster} alt="" />
        )}
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {Title}
        </span>
        <p>
          {Year} <span className="right">{Type}</span>
        </p>
      </div>
    </div>
  );
}

export { Movie };
