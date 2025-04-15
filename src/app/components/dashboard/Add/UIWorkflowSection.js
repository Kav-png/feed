import React from "react";
import WorkflowTable from "./WorkflowTable";
import ComponentDropdown from "./ComponentDropdown";

const UIWorkflowSection = ({ fulldata, nextData, itemList, updateCentral }) => (
  <div>
    <WorkflowTable itemList={itemList} nextData={nextData} />
    <ComponentDropdown
      fulldata={fulldata}
      itemList={itemList}
      updateCentral={updateCentral}
    />
  </div>
);

export default UIWorkflowSection;
