import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
    props; // Object Destructuring
  return (
    <ul className="list-group">
      {items.map((item) => (
        // <li key={item._id} class="list-group-item">
        //   {item.name}
        // </li>
        // To make it dynamic we will pass text and value property dynamically from props
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
