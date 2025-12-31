import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import styled from "styled-components";
import { forwardRef } from "react";

// Input personnalisé pour react-datepicker
const CustomInput = forwardRef(({ value, onClick, id, placeholder }, ref) => (
  <InputWrapper>
    <StyledInput
      onClick={onClick}
      ref={ref}
      value={value}
      id={id}
      placeholder={placeholder}
      readOnly
    />
    <CalendarIcon onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </CalendarIcon>
  </InputWrapper>
));

CustomInput.displayName = "CustomInput";

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

function DatePicker({ id, selected, onChange, required = true, placeholder = "Select date...", ...props }) {
  return (
    <DatePickerWrapper>
      <ReactDatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput id={id} placeholder={placeholder} />}
        showPopperArrow={false}
        required={required}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        popperPlacement="bottom-end"
        {...props}
      />
    </DatePickerWrapper>
  );
}

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default DatePicker;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 10px 40px 10px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 0.6rem;
  background: #fdfdfd;
  font-weight: 400;
  font-size: 1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.75);
  transition: all 0.2s ease;
  cursor: pointer;

  &::placeholder {
    color: rgba(0, 0, 0, 0.38);
  }

  &:hover {
    border-color: #bfc5c5;
    background-color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #058b80;
    box-shadow: 0 0 0 3px rgba(5, 139, 128, 0.15);
    background-color: #fff;
  }
`;

const CalendarIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #078f84ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 1;

  ${StyledInput}:hover ~ & {
    color: #058b80;
  }
`;

const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }


  .react-datepicker {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    border: 1px solid #d9d9d9;
    border-radius: 0.6rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }

  .react-datepicker__header {
    background-color: #058b80;
    border-bottom: none;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    padding-top: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #fff;
    font-weight: 500;
  }

  .react-datepicker__current-month {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    line-height: 30px;
    position: relative;
    order: 0;
  }

  /* Styles pour les dropdowns mois/année */
  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    margin: 0 5px;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    background-color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.4rem;
    color: #046961;
    font-weight: 500;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.95);
      border-color: #046961;
    }

    &:focus {
      outline: none;
      border-color: #046961;
      box-shadow: 0 0 0 2px rgba(4, 105, 97, 0.2);
    }
  }

  .react-datepicker__year-option,
  .react-datepicker__month-option {
    &:hover {
      background-color: rgba(5, 139, 128, 0.1);
    }
  }

  .react-datepicker__day {
    color: rgba(0, 0, 0, 0.75);
    border-radius: 0.4rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(5, 139, 128, 0.1);
      border-radius: 0.4rem;
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #058b80;
    color: #fff;
    border-radius: 0.4rem;
    font-weight: 500;

    &:hover {
      background-color: #046961;
    }
  }

  .react-datepicker__day--today {
    font-weight: 600;
    color: #058b80;
  }

  .react-datepicker__day--disabled {
    color: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }

  .react-datepicker__navigation {
    position: absolute;
    top: 15px;
    margin-top: 0px;
    width: 20px;
    height: 30px;
    border: none;
    text-indent: -999em;
    overflow: hidden;
    cursor: pointer;
    background: none;
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .react-datepicker__navigation--previous {
    left: 10px;
  }

  .react-datepicker__navigation--next {
    right: 10px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #fff;
    border-width: 2px 2px 0 0;
    height: 6px;
    width: 6px;
    top: 7px;
  }

  .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
    border-color: rgba(255, 255, 255, 0.8);
  }
`;
