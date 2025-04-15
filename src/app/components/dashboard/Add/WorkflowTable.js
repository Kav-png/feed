import React from "react";

const WorkflowTable = ({ itemList, nextData }) => (
  <div>
    {itemList.map((item, index) => (
      <div key={index}>
        <b>Step {index + 1}</b>: {JSON.stringify(nextData[item])}
      </div>
    ))}
  </div>
);

export default WorkflowTable;
