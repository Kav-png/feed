import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RenderComponent from "./RenderComponent";
import DropdownComponent from "./DropdownComponent";
import ExcelUpload from "./ExcelUpload";
import WorkflowTable from "./WorkflowTable";
import { Button, SpinningWheel, MessageBox } from "uwr-react-widgets";
import cookie from "react-cookies";

class Add extends Component {
  state = {
    itemList: [],
    nextData: {},
    itemCount: 0,
    uploadExcel: false,
    fulldata: null,
    response: [],
    shiftUpload: [],
    loading: false,
  };

  componentDidMount() {
    // Fetch initial data for rendering components
    fetch(
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/ui/fields/generic_workflow/"
    )
      .then((data) => data.json())
      .then((res) => {
        this.setState({ fulldata: res });
      })
      .catch((error) => {
        console.error("Error fetching fulldata:", error);
      });
  }

  toggleUploadMode = () => {
    this.setState((prevState) => ({ uploadExcel: !prevState.uploadExcel }));
  };

  updateCentral = (key, value) => {
    this.setState((prevState) => ({
      nextData: {
        ...prevState.nextData,
        [key]: { ...prevState.nextData[key], ...value },
      },
    }));
  };

  updateValidation = (key, isValid) => {
    const allValidations = { ...this.state.all_validation, [key]: isValid };
    const validationFailed = Object.values(allValidations).includes(false);
    this.setState({ all_validation: allValidations });

    const id = Object.keys(this.state.nextData).length - 1;
    document.getElementById("button_submit" + id).disabled = validationFailed;
    document.getElementById("button_next" + id).disabled = !isValid;
  };

  handleSubmit = (key, value) => {
    const nextData = { ...this.state.nextData, [key]: value };
    this.setState({ nextData }, () => {
      console.log("Submitting data:", nextData);
    });

    // Add API call logic here
  };

  addItem = (component) => {
    this.setState((prevState) => ({
      itemList: [...prevState.itemList, { component }],
    }));
  };

  render() {
    const { uploadExcel, fulldata, itemList, nextData } = this.state;

    return (
      <div>
        <Button
          size={Button.size.SMALL}
          style={{ width: "15%", float: "right" }}
          onClick={this.toggleUploadMode}
        >
          {uploadExcel ? "Add config through UI" : "Add config through Excel"}
        </Button>

        {uploadExcel ? (
          <ExcelUpload />
        ) : (
          <div>
            <p>Fields marked with * are mandatory</p>
            {!fulldata && <SpinningWheel />}
            {fulldata && (
              <RenderComponent
                component="Pattern"
                fulldata={fulldata["Pattern"]}
                updateCentral={this.updateCentral}
                updateValidation={this.updateValidation}
                handleSubmit={this.handleSubmit}
                item="#0"
              />
            )}
            <WorkflowTable itemList={itemList} nextData={nextData} />
            <DropdownComponent
              fulldata={fulldata}
              itemList={itemList}
              addItem={this.addItem}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Add);
