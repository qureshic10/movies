import React from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
class MoviesTable extends React.Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          // onClick={() => this.handleLike(movie)}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
    // {
    //   key: "delete",
    //   content: (movie) => (
    //     <button
    //       // onClick={() => this.handleDelete(movie)}
    //       onClick={() => this.props.onDelete(movie)}
    //       className="btn btn-danger btn-sm"
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        // onClick={() => this.handleDelete(movie)}
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  // Created this constructer to hide the delete button if the user is not an admin.
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    //const { movies, onDelete, onLike, onSort } = this.props; // use this.props because it is not a parameter here
    // const { movies, onDelete, onLike } = this.props; // onSort is not used anymore so we have deleted that
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      /* Following syntax is to generate markup of table. //
      table.table>thead>tr>th*4 */
      //   <table className="table">
      //     {/* <thead>
      //       <tr>
      //         <th onClick={() => this.raiseSort("title")}>Title</th>
      //         <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
      //         <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
      //         <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
      //         <th></th>
      //         <th></th>
      //       </tr>
      //     </thead> */}
      //     <TableHeader
      //       columns={this.columns}
      //       sortColumn={sortColumn}
      //       onSort={onSort}
      //     />
      //     <TableBody columns={this.columns} data={movies} />
      //     {/* <tbody> */}
      //     {/* {this.state.movies.map((movie) => ( */}
      //     {/* use movies object in this method  */}
      //     {/* {movies.map((movie) => (
      //         <tr key={movie._id}>
      //           <td>{movie.title}</td>
      //           <td>{movie.genre.name}</td>
      //           <td>{movie.numberInStock}</td>
      //           <td>{movie.dailyRentalRate}</td>
      //           <td>
      //             <Like
      //               liked={movie.liked}
      //               // onClick={() => this.handleLike(movie)}
      //               onClick={() => onLike(movie)}
      //             />
      //           </td>
      //           <td>
      //             <button
      //               // onClick={() => this.handleDelete(movie)}
      //               onClick={() => onDelete(movie)}
      //               className="btn btn-danger btn-sm"
      //             >
      //               Delete
      //             </button>
      //           </td>
      //         </tr>
      //       ))}
      //     </tbody> */}
      //   </table>
    );
  }
}

export default MoviesTable;
