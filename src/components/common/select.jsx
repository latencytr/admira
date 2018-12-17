import React from "react";

const Select = ({
  name,
  label,
  error,
  items,
  textProperty,
  valueProperty,
  ...rest
}) => {
  function handleLoad() {}
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        {...rest}
        className="custom-select"
        autoFocus
      >
        <option value="" />
        {items.map(item => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
