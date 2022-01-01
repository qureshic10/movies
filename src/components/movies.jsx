import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
//import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
//import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
//import Like from "./common/like"; // We need it in moviesTable.jsx
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    // Genre from genreService.js which will get data from webapi
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    // movies from movieService.js which will get data from webapi
    const { data: movies } = await getMovies();

    this.setState({ movies, genres }); // Now we will use the constant variable only because key and values are same
  }

  // componentDidMount() {
  //   // Genre from fakGenreService.js
  //   const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; // Now we will add All Genres to the array with only name because we don't need id to filter. _id must be added error to avoid error in the console
  //   // this.setState({ movies: getMovies(), getGenres() });
  //   this.setState({ movies: getMovies(), genres }); // Now we will use the constant variable only because key and values are same
  // }

  // Delete a movie. You can filter the selected movie with with the delete button is pressed.
  // Following we have filtered the deleted movie.
  // handleDelete = (movie) => {
  //   const movies = this.state.movies.filter((m) => m._id !== movie._id);
  //   this.setState({ movies: movies });
  // };

  // Delete movies from webapi
  // If you get Access denied error here it means user is not admin. Add a isAdmin field to users document from MongoDB and set it to true with datatype boolean.

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast.success("The movie has been deleted successfully!");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    //movie.liked === true ? !movie.liked : movie.liked;
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    //console.log("Like Cliked", movie);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); //to update the state and reload the pagination component
  };

  handleGenreSelect = (genre) => {
    // this.setState({ selectedGenre: genre }); // to highlight the selected item from list group
    // searchQuery will be empty here because when we select genre it will clear all the filters. We are using controlled components so we will use empty string for the react to understand.
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 }); // reset the page to 1 to show the 1st page
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    //this.setState({ sortColumn: { path, order: "asc" } });
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state; // ObjectDestructuring

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    // we have added && selectedGenre._id to show all genres incase there is no id
    // We have commented the following filter because now we have 2 filters. 1 with search box and other with listgroup
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies; // filter out the movies based on selected genre or show all movies.

    // Here we will implement sorting after filtering the data. We will use lodash
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //  const movies = paginate(allMovies, currentPage, pageSize);
    //const movies = paginate(filtered, currentPage, pageSize); // before we were passing all movies now we will pass only filtered movies
    const movies = paginate(sorted, currentPage, pageSize); // before we were passing filtered movies now we will pass only sorted movies

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // assign a length property of the movies array to count constant so that we can reuse it.
    const { length: count } = this.state.movies; // ObjectDestructuring
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state; // ObjectDestructuring
    const { user } = this.props;

    //if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      // There can be only 1 element that we can return. So we wrap the content in react.Fragment.
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            // Commenting this code because of using default props in ListGroup.jsx file
            // textProperty="name"
            // valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          {/* <p>Showing {count} movies in the database.</p> */}
          {/* Now we will show filtered count */}
          {/* <p>Showing {filtered.length} movies in the database.</p> */}
          {/* totalCount is coming from extracted method getPagedData */}
          <p>
            Showing {totalCount} movies in the database.
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn} // Now we are doing the sorting on moviesTable.jsx
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            // itemsCount={count}
            //itemsCount={filtered.length} // if we are flitering we need to pass the length of the filtered movies.
            itemsCount={totalCount} // totalCount is coming from extracted method getPagedData
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
