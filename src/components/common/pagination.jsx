import React from "react";
import _ from "lodash"; // underscore. it is used to generate arrays
// npm i prop-types@15.6.2 // Install prop-types from terminal
import PropTypes from "prop-types"; // For type checking

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props; // objectDestructuring
  //console.log(currentPage); // Just to verify that we are getting the currentPage from movies.jsx
  const pagesCount = Math.ceil(itemsCount / pageSize); // convert the pageCount to closest integer number
  if (pagesCount === 1) return null; // If pageCount = 1 we will not show pagination
  const pages = _.range(1, pagesCount + 1); // lodash to generate array for a range from 1 to pageCount

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// For checking types of the props
// When use components it is a good practice to use propTypes to catch bugs
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
