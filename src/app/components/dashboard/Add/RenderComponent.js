import React from "react";
import InputField from "./InputField";

const RenderComponent = ({ component, fulldata, updateCentral }) => (
  <div>
    {fulldata[component]?.map((field, index) => (
      <InputField key={index} field={field} updateCentral={updateCentral} />
    ))}
  </div>
);

export default RenderComponent;
