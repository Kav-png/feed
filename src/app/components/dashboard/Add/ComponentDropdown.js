import React from "react";
import { Dropdown, DropdownOption } from "uwr-react-widgets";

const ComponentDropdown = ({ fulldata, itemList, updateCentral }) => (
  <div>
    {itemList.map((item, index) => (
      <Dropdown
        key={index}
        labelBeforeSelect="Choose Next Component"
        onChange={(e) => {
          const component = e.selectedItemId.split("_")[0];
          updateCentral(item, { component });
        }}
      >
        {Object.keys(fulldata || {}).map((key) => (
          <DropdownOption key={key} itemId={`${key}_${item}`}>
            {key}
          </DropdownOption>
        ))}
      </Dropdown>
    ))}
  </div>
);

export default ComponentDropdown;
