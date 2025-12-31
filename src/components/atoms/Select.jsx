import ReactSelect from "react-select";
import PropTypes from "prop-types";

function Select({ id, options = [], required = true, defaultValue = "", ...props }) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      padding: "2px",
      border: state.isFocused
        ? "1px solid #058b80"
        : "1px solid #d9d9d9",
      borderRadius: "0.6rem",
      backgroundColor: state.isFocused ? "#fff" : "#fdfdfd",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(5, 139, 128, 0.15)"
        : "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#bfc5c5",
        backgroundColor: "#fff",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 8px",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: "rgba(0, 0, 0, 0.75)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(0, 0, 0, 0.38)",
      fontWeight: 400,
    }),
    singleValue: (base) => ({
      ...base,
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: 400,
      fontSize: "1rem",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#078f84ff",
      "&:hover": {
        color: "#058b80",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.6rem",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid #d9d9d9",
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#058b80"
        : state.isFocused
        ? "rgba(5, 139, 128, 0.1)"
        : "#fff",
      color: state.isSelected ? "#fff" : "rgba(0, 0, 0, 0.87)",
      cursor: "pointer",
      padding: "10px 12px",
      fontSize: "1rem",
      fontWeight: 400,
      "&:active": {
        backgroundColor: "#046961",
      },
    }),
  };

  return (
    <ReactSelect
      inputId={id}
      name={id}
      options={options}
      styles={customStyles}
      placeholder="Choose…"
      isSearchable={true}
      required={required}
      defaultValue={defaultValue ? options.find(opt => opt.value === defaultValue) : null}
      {...props}
    />
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default Select;
