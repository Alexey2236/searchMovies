import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    type: "all",
  };

  handleKey = (e) => {
    if (e.key === "Enter") {
      this.props.searchMuvies(this.state.search, this.state.type);
    }
  };

  handleFilter = (e) => {
    this.setState(
      () => ({ type: e.target.value }),
      () => {
        this.props.searchMuvies(this.state.search, this.state.type);
      }
    );
  };

  render() {
    return (
      <div className="row">
        <div className="input-field">
          <input
            placeholder="search..."
            type="search"
            className="validate"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="btn search-btn"
            onClick={() =>
              this.props.searchMuvies(this.state.search, this.state.type)
            }
          >
            Search
          </button>
        </div>
        <label className="filter-radio-btn">
          <input
            className="with-gap"
            name="type"
            type="radio"
            value={"all"}
            onChange={() => this.handleFilter}
            checked={this.state.type === "all"}
          />
          <span>All</span>
        </label>

        <label className="filter-radio-btn">
          <input
            className="with-gap"
            name="type"
            type="radio"
            value={"movie"}
            onChange={this.handleFilter}
            checked={this.state.type === "movie"}
          />
          <span>Movies</span>
        </label>

        <label className="filter-radio-btn">
          <input
            className="with-gap"
            name="type"
            type="radio"
            value={"series"}
            onChange={this.handleFilter}
            checked={this.state.type === "series"}
          />
          <span>Series</span>
        </label>

        <label className="filter-radio-btn">
          <input
            className="with-gap"
            name="type"
            type="radio"
            value={"episode"}
            onChange={this.handleFilter}
            checked={this.state.type === "episode"}
          />
          <span>Episode</span>
        </label>
      </div>
    );
  }
}
export { Search };
