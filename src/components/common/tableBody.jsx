import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  // clean up code
  renderCell = (item, column) => {
    if (column.content) return column.content(item); // for like and delete
    return _.get(item, column.path); // for other data
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              // we have used column.key for the like and delete button
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
