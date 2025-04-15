import React from "react";
import { Dropdown, DropdownOption } from "uwr-react-widgets";

const DropdownComponent = ({ fulldata, itemList, addItem }) => {
  if (!fulldata) return null;

  return (
    <div>
      {itemList.map((item, index) => (
        <Dropdown
          key={index}
          labelBeforeSelect="Choose Next Component"
          onChange={(e) => addItem(e.selectedItemId.split("_")[0])}
        >
          {Object.keys(fulldata).map((key) => (
            <DropdownOption key={key} itemId={`${key}_${item}`}>
              {key}
            </DropdownOption>
          ))}
        </Dropdown>
      ))}
    </div>
  );
};

export default DropdownComponent;
