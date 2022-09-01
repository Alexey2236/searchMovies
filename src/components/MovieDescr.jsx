import React from "react";
import { Spiner } from "./Spiner";

function MovieDescr(props) {
  const { descrMovie, closeModal } = props;
  const {
    Title,
    Year,
    Poster,
    Actors,
    Plot,
    Writer,
    Language,
    Country,
    Awards,
  } = props.descrMovie;
  return (
    <div className="movie-descr-wrapper">
      <i onClick={closeModal} className="material-icons">
        close
      </i>
      {descrMovie ? (
        <div className="deccr">
          <div className="descr-wrapper">
            <img className="poster" src={Poster} alt="" />
            <div className="text">
              <h5 className="title">{Title}</h5>
              <p>
                {" "}
                <b>Year:</b> {Year}
              </p>
              <p>
                <b>Actors:</b> {Actors}
              </p>
              <p>
                <b>Description:</b> {Plot}
              </p>
              <p>
                <b>Writer:</b> {Writer}
              </p>
              <p>
                <b>Language:</b> {Language}
              </p>
              <p>
                <b>Country:</b> {Country}
              </p>
              <p>
                <b>Awards:</b> {Awards}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Spiner />
      )}
    </div>
  );
}
export { MovieDescr };
