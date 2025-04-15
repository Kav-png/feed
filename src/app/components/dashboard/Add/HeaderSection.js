import React from "react";
import { Button } from "uwr-react-widgets";

const HeaderSection = ({ uploadExcel, toggleMode }) => (
  <div>
    <Button
      size={Button.size.SMALL}
      style={{ width: "15%", float: "right" }}
      onClick={() => toggleMode(!uploadExcel)}
    >
      {uploadExcel ? "Add config through UI" : "Add config through Excel"}
    </Button>
  </div>
);

export default HeaderSection;
