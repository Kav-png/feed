import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import ExcelUploadSection from "./ExcelUploadSection";
import UIWorkflowSection from "./UIWorkflowSection";

class AddMain extends Component {
  state = {
    uploadExcel: false, // Toggle between Excel and UI modes
    fulldata: null, // Data for rendering components
    nextData: {}, // Central store for all component data
    itemList: [], // List of added components
  };

  componentDidMount() {
    // Fetch initial data for rendering components
    fetch(
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/ui/fields/generic_workflow/"
    )
      .then((data) => data.json())
      .then((res) => {
        this.setState({ fulldata: res });
      });
  }

  toggleMode = (uploadExcel) => {
    this.setState({ uploadExcel });
  };

  updateCentral = (key, value) => {
    this.setState((prevState) => ({
      nextData: {
        ...prevState.nextData,
        [key]: { ...prevState.nextData[key], ...value },
      },
    }));
  };

  render() {
    const { uploadExcel, fulldata, nextData, itemList } = this.state;

    return (
      <div>
        <HeaderSection uploadExcel={uploadExcel} toggleMode={this.toggleMode} />
        {uploadExcel ? (
          <ExcelUploadSection />
        ) : (
          <UIWorkflowSection
            fulldata={fulldata}
            nextData={nextData}
            itemList={itemList}
            updateCentral={this.updateCentral}
          />
        )}
      </div>
    );
  }
}

export default withRouter(AddMain);
