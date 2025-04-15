import React from "react";
import { Input, Dropdown, DatePicker } from "uwr-react-widgets";

const InputField = ({ field, updateCentral }) => {
  const handleChange = (e) => {
    updateCentral(field.DB_COLUMN, e.target.value);
  };

  switch (field.FIELD_TYPE) {
    case "Textbox":
      return (
        <Input
          label={field.FIELD_LABEL}
          onChange={handleChange}
          pattern={field.FIELD_VALIDATION}
        />
      );
    case "Dropdown":
      return (
        <Dropdown
          labelBeforeSelect={field.FIELD_LABEL}
          onChange={(e) => handleChange(e)}
        >
          {field.FIELD_VALUES.map((value, index) => (
            <DropdownOption key={index} itemId={value}>
              {value}
            </DropdownOption>
          ))}
        </Dropdown>
      );
    case "Date":
      return <DatePicker onChange={handleChange} />;
    default:
      return null;
  }
};

export default InputField;
