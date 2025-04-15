import React from "react";
import InputField from "./InputField";

const RenderComponent = ({
  component,
  fulldata,
  updateCentral,
  updateValidation,
  handleSubmit,
  item,
}) => {
  if (!fulldata) {
    return <div>No data available for {component}</div>;
  }

  return (
    <div>
      <h3>
        Step {item.split("#")[1]} - {component}
      </h3>
      {fulldata.map((field, index) => (
        <InputField
          key={index}
          field={field}
          updateCentral={updateCentral}
          updateValidation={updateValidation}
          item={item}
        />
      ))}
      <button onClick={() => handleSubmit(component + item, {})}>Submit</button>
    </div>
  );
};

export default RenderComponent;
