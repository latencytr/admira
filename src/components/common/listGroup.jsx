import React from "react";
//import _ from "lodash";
import PropTypes from "prop-types";

const ListGroup = ({
  listItems,
  onItemChange,
  textProperty,
  valueProperty,
  selectedItem
}) => {
  return (
    <ul className="list-group list-group-responsive">
      {listItems.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemChange(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  listItems: PropTypes.array.isRequired,
  onItemChange: PropTypes.func.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired
};

export default ListGroup;
