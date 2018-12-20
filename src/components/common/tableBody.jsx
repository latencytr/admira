import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

//data: array
//sortColumn: object
//onSort: function

class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns, valueProperty, textProperty } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td
                className="tableCellCentered"
                key={this.createKey(item, column)}
              >
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
