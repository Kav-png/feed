import React, { Component } from "react";
import {
  Dropdown,
  DropdownOption,
  Input,
  Button,
  DatePicker,
  SpinningWheel,
  MessageBox,
  Snackbar,
  Switch,
  RadioButtonGroup,
  RadioButton,
  FileUpload,
} from "uwr-react-widgets";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import SignInSide from "../Register";
import { Col, Row } from "react-bootstrap";
// import ReactFileReader from "react-file-reader";
import Papa from "papaparse";
import Editable from "./Editable";
// import { FileUpload } from '@uwr/react-widgets';
// import { FilePdf, FileMovDisabled, FileXlsDisabled, FileDocDisabled } from '@uwr/icons/react/fileType';

class RenderComponent extends Component {
  state = {
    [this.props.component + this.props.item]: {},
    validated: {},
    disable: true,
    count: -1,
    count_true: [],
    validation_failed: false,
    validated_values: [],
    flag_config1: true,
    uniq_flag: false,
    businessStream: [""],
    applicationName: [""],
    data: [],
    file: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      console.log("in props2 of render", this.props.component, this.props.item);
      this.setState({ [this.props.component + this.props.item]: {} }, () => {});
    }
  }
  componentDidMount() {
    console.log(">>>>>>", process.env.REACT_APP_APPD_WEB_SERVICE_20);
    const url =
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/workflow/clusterisac/";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ division: cookie.load("division") }),
      contentType: "application/json",
    };
    fetch(url, options)
      // fetch(process.env.REACT_APP_ROUTER_WEB_SERVICE + '/workflow/clusterisac/')

      .then((data) => data.json())
      .then((res) => {
        this.setState({ businessStream: res.response }, () => (
          <SignInSide fields={this.state.businessStream} />
        ));
      })
      .catch((err) => {
        console.log("Error in fetching isac clusters", err);
      });

    var temp = this.props.item.split("#")[1];

    var t1 = document.getElementById("button_submit" + temp);
    var t2 = document.getElementById("button_next" + temp);
    //console.log("did mount 1",temp,t1,t2)
    if (t1 !== null) {
      document.getElementById("button_submit" + temp).disabled = true;
    }
    if (t2 !== null) {
      document.getElementById("button_next" + temp).disabled = true;
    }
  }
  uniquePattern = (e) => {
    console.log("e in up", e.target.id, e.target.value);
    var id = e.target.id;
    var value = e.target.value;
    var el = id + "_errorMessageType";
    var elMessage = id + "_errorMessage";
    var config1_Patt = id.split("_")[1];

    if (
      this.props.component === "Pattern" &&
      config1_Patt === "Config1" &&
      value !== ""
    ) {
      this.setState({ flag_config1: false }, () =>
        console.log("inside fetch", this.state.flag_config1)
      );
      const url =
        process.env.REACT_APP_ROUTER_WEB_SERVICE +
        "/workflow/checkPatternUnique";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          pattern_name: value,
          division: cookie.load("division"),
        }),
        contentType: "application/json",
      };
      var res = fetch(url, options)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          console.log("Pattern_val", data.response, value);
          // this.setState({ response_patt: data.response })
          return data.response;
        })
        .catch((error) => {
          console.log("error: " + error);

          return error;
        });

      console.log("PV", value, res);
      res.then((c) => {
        console.log("h ", c);
        if (c === false) {
          this.setState({ [el]: "error" });
          this.setState({ [elMessage]: "Duplicate pattern" });
          // this.setState({ ["#0_Config1"]: value })
          // var validated = this.state.validated
          // validated["#0_Config1"] = false
          // this.setState({ validated: validated })
          // console.log("xx in c if", this.state.validated, c, "falsecount", this.state.validation_failed)
        } else if (c === true) {
          // this.setState({ ["#0_Config1"]: value })
          this.setState({ [el]: "" });
          this.setState({ [elMessage]: "" });
          // var validated = this.state.validated
          // validated["#0_Config1"] = true
          // this.setState({ validated: validated })
          // console.log("xx in c else ", this.state.validated, c, "falsecount", this.state.validation_failed)
        } else {
          this.setState({ [el]: "error" });
          this.setState({
            [elMessage]:
              "Api Down , please try again later as we cannot check if Pattern is unique",
          });
          c = false;
        }

        console.log("condition in up", c);
        //var temp = this.state.uniq_Pattern && c
        this.setState({ uniq_Pattern: c }, () => {
          // if (this.state.uniq_Pattern && this.state.uniq_flag) {
          //     this.setState({ disable: false })
          // }
          // else {
          //     this.setState({ disable: true })
          // }
        });
        var key = this.props.component + this.props.item;
        console.log("aa in uniqu", key, this.state.uniq_Pattern);
        this.props.updateValidation(
          key,
          this.state.uniq_flag,
          this.state.uniq_Pattern
        );

        console.log("in up", this.state.uniq_Pattern);
      });
    }
  };
  inputChange = (e) => {
    var regex = new RegExp(e.target.pattern);
    var value = e.target.value;
    var result = regex.test(value);
    var el = e.target.id + "_errorMessageType";
    var elMessage = e.target.id + "_errorMessage";
    var fulldata = this.props.fulldata;

    // count the mandatory fields
    if (this.state.count === -1) {
      for (var i = 0; i < fulldata.length; i++) {
        if (fulldata[i]["FIELD_REQUIRED"] === 1) {
          this.state.count = this.state.count + 1;
        }
      }
      this.setState({ count: this.state.count + 1 });
    }

    // count the required fields
    if (e.target.getAttribute("mandatory") === "1") {
      var count_true = this.state.count_true;
      count_true[e.target.id] = true;
      {
        this.setState({ count_true: count_true });
      }
    }

    // console.log("count of mandatory fields", this.state.count,"count_true",count_true)

    var values_mandatory = Object.values(this.state.count_true);

    if (
      e.target.getAttribute("mandatory") === "1" &&
      e.target.value.length == 0
    ) {
      this.setState({ [el]: "error" });
      this.setState({ [elMessage]: "Required" });
      this.setState({ [e.target.id]: e.target.value });
      var validated = this.state.validated;
      validated[e.target.id] = false;
      this.setState({ validated: validated });
    } else {
      if (result === false) {
        this.setState({ [el]: "error" });
        this.setState({ [elMessage]: "Follow Tooltip for more information" });
        this.setState({ [e.target.id]: e.target.value });
        var validated = this.state.validated;
        validated[e.target.id] = false;
        this.setState({ validated: validated });
        console.log(
          "validated in if",
          this.state.validated,
          "id",
          e.target.id,
          "falsecount",
          this.state.validation_failed
        );
      } else {
        this.setState({ [e.target.id]: e.target.value });
        this.setState({ [el]: "" });
        var validated = this.state.validated;
        validated[e.target.id] = true;
        this.setState({ validated: validated });
        console.log(
          "validated in else",
          this.state.validated,
          "id",
          e.target.id,
          "falsecount",
          this.state.validation_failed
        );
      }
    }

    var validated_values = Object.values(this.state.validated);
    this.state.validation_failed = validated_values.includes(false);
    console.log(
      "xx values",
      validated_values,
      "validation_failed",
      this.state.validation_failed
    );
    this.setState({
      uniq_flag:
        this.state.count === values_mandatory.length &&
        this.state.validation_failed === false,
    });

    // if (this.state.count === values_mandatory.length && this.state.validation_failed === false && this.state.uniq_Pattern) {

    //     this.setState({ disable: false })
    // }
    // else {
    //     this.setState({ disable: true })
    // }

    var key = this.props.component + this.props.item;
    var comp = this.state[this.props.component + this.props.item];
    //console.log("In input change",this.props.component,this.props.item,comp,e.target)
    comp[[e.target.id.split("_")[1]]] = e.target.value;
    this.setState({ [this.props.component + this.props.item]: comp }, () => {
      // console.log(this.state[this.props.component + this.props.item])
      console.log("before update In input change, ", key);
      this.props.updateCentral(key, this.state[key]);
      console.log("aa in inputchange", key, this.state.uniq_flag);
      this.props.updateValidation(
        key,
        this.state.uniq_flag,
        this.state.uniq_Pattern
      );
    });
  };
  typeChange = (e) => {
    var dropdownid =
      e.selectedItemId.split("_")[1] + "_" + e.selectedItemId.split("_")[2];
    var logscheck = e.selectedItemId.split("_")[2];
    console.log("DD1", e.selectedValue, this.props.component, logscheck);

    this.setState({ [dropdownid]: e.selectedItemId });
    var key = this.props.component + this.props.item;
    var comp = this.state[this.props.component + this.props.item];
    console.log(
      "DD2",
      (this.props.component[logscheck] ===
        comp[[e.selectedItemId.split("_")[2]]],
      e.selectedValue === "None")
    );

    if (
      ((this.props.component === "LogsCheck" && logscheck === "Config1") ||
        (this.props.component === "CompareVariable" &&
          logscheck === "Config1") ||
        (this.props.component === "DatabaseCheck" && logscheck === "Config1") ||
        (this.props.component === "RunCommand" && logscheck === "Config1") ||
        (this.props.component === "RunCommand" && logscheck === "Config4")) &&
      e.selectedValue === "None"
    ) {
      comp[[e.selectedItemId.split("_")[2]]] = "";
    } else {
      comp[[e.selectedItemId.split("_")[2]]] = e.selectedValue;
    }

    console.log("DD", this.state, this.props);
    console.log("e", e, "mandatory", e.selectedItemId.split("_")[3]);
    var mandatory_field = e.selectedItemId.split("_")[3];
    // count the mandatory fields
    if (mandatory_field === "1") {
      var count_true = this.state.count_true;
      count_true[dropdownid] = true;
      {
        this.setState({ count_true: count_true });
      }
    }
    var values_mandatory = Object.values(this.state.count_true);
    //  console.log("mandatory fields", values_mandatory, "count of mandatory fields", values_mandatory.length, "Button", this.state.disable)
    this.setState({ uniq_flag: this.state.count === values_mandatory.length });
    // if (this.state.count === values_mandatory.length && this.state.uniq_Pattern) {
    //     this.setState({ disable: false })
    // }
    // else {
    //     this.setState({ disable: true })
    // }

    this.setState({ [this.props.component + this.props.item]: comp }, () => {
      console.log(this.state[this.props.component + this.props.item], comp);

      this.props.updateCentral(key, this.state[key]);
      // console.log("aa",this.state.uniq_flag)
      this.props.updateValidation(key, this.state.uniq_flag);
    });
  };

  handleChange_calender = (e) => {
    console.log("cal", e.target.id, e.target.id.split("_")[1].split("-")[0]);
    var config = e.target.id;
    var userEntered = new Date(e.target.value); // valueAsNumber has no time or timezone!
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var el = e.target.id.split("-")[0] + "_errorMessageType";
    var elMessage = e.target.id.split("-")[0] + "_errorMessage";
    console.log(userEntered, today);
    if (userEntered.getTime() < today.getTime()) {
      this.setState({ [el]: "error" });
      this.setState({
        [elMessage]:
          "Date You have entered is in the past. Select a valid date",
      });
      this.setState({ [e.target.id]: e.target.value });
    } else {
      this.setState({ [e.target.id]: e.target.value });
      this.setState({ [el]: "" });
    }
    this.setState({ [e.target.id.split("-")[0]]: e.target.value });
    var comp = this.state[this.props.component + this.props.item];
    comp[e.target.id.split("_")[1].split("-")[0]] = e.target.value;
    this.setState({ [this.props.component + this.props.item]: comp });
    // console.log("date",e.target.id)
  };

  handleStream = (e) => {
    this.setState(
      { business_stream: e.selectedValue },
      console.log("ccc", e.selectedValue, e.id)
    );
    // this.state.result[e.id] = e.selectedValue
    fetch(
      process.env.REACT_APP_ROUTER_WEB_SERVICE +
        "/workflow/appisac/" +
        e.selectedValue +
        "/"
    )
      .then((data) => data.json())
      .then((res) => {
        this.setState({ applicationName: res.response }, () =>
          console.log("applicationName", this.state.applicationName)
        );
      });
  };
  // handleApp = (e) => {
  //     console.log("ccc", e.selectedValue, e.id)
  //     this.setState({ application: e.selectedValue }, console.log("ccc", this.state.application))
  // }

  render() {
    //console.log("temp",this.state.disable)

    var res = [];
    var fulldata = this.props.fulldata;
    console.log("FULL DATA>", fulldata, this.props.component);
    var component = this.props.component;
    var BS = this.state.businessStream;
    var count = 0;
    console.log(fulldata);
    for (var i = 0; i < fulldata.length; i++) {
      if (
        this.props.component === "Pattern" &&
        fulldata[i]["DB_COLUMN"] === "Config5" &&
        fulldata[i]["FIELD_LABEL"] === "Application Name"
      ) {
        fulldata[i]["FIELD_VALUES"] = this.state.applicationName;

        res.push(
          <br></br>,
          <Dropdown
            id="BUSINESS_STREAM"
            position="right"
            padding="20px"
            labelBeforeSelect="Choose Business Stream"
            labelAfterSelect="Business Stream"
            width="50%"
            required={true}
            withSearch={true}
            selectedValue={this.state.business_stream}
            onChange={this.handleStream}
            selectedItemId={fulldata[i]["DB_COLUMN"]}
          >
            {this.state.businessStream &&
              this.state.businessStream.map((item) => (
                <DropdownOption itemId={item.id} selected={false}>
                  {item.clusterName}
                </DropdownOption>
              ))}
          </Dropdown>,
          <br></br>,

          <br></br>,
          <Dropdown
            width="50%"
            labelBeforeSelect={"Choose " + fulldata[i]["FIELD_LABEL"]}
            labelAfterSelect={fulldata[i]["FIELD_LABEL"]}
            onChange={this.typeChange}
            selectedItemId={
              this.state[this.props.item + "_" + fulldata[i]["DB_COLUMN"]]
            }
            selectedValue={this.state.application}
            required={fulldata[i]["FIELD_REQUIRED"]}
            withSearch={true}
          >
            {fulldata[i]["FIELD_VALUES"] &&
              fulldata[i]["FIELD_VALUES"].map((type) => (
                <DropdownOption
                  key={type.id}
                  itemId={
                    type.appName +
                    "_" +
                    this.props.item +
                    "_" +
                    fulldata[i]["DB_COLUMN"] +
                    "_" +
                    fulldata[i]["FIELD_REQUIRED"]
                  }
                >
                  {type.appName}
                </DropdownOption>
              ))}
          </Dropdown>,
          <br></br>
        );
      } else if (fulldata[i]["FIELD_TYPE"] === "Textbox") {
        res.push(
          <br></br>,
          <Input
            style={{
              position: "centre",
              top: "50%",
            }}
            key={component.split("_")[1] + "_" + i}
            id={this.props.item + "_" + fulldata[i]["DB_COLUMN"]}
            width="50%"
            componentName={component}
            label={fulldata[i]["FIELD_LABEL"]}
            placeholder={fulldata[i]["FIELD_VALUES"]}
            value={this.state[this.props.item + "_" + fulldata[i]["DB_COLUMN"]]}
            type={fulldata[i]["FIELD_TYPE"]}
            mandatory={fulldata[i]["FIELD_REQUIRED"]}
            required={fulldata[i]["FIELD_REQUIRED"]}
            example={fulldata[i]["FIELD_EXAMPLE"]}
            message={
              this.state[
                this.props.item +
                  "_" +
                  fulldata[i]["DB_COLUMN"] +
                  "_errorMessage"
              ]
            }
            messageType={
              this.state[
                this.props.item +
                  "_" +
                  fulldata[i]["DB_COLUMN"] +
                  "_errorMessageType"
              ]
            }
            tooltip={fulldata[i]["FIELD_EXAMPLE"]}
            onChange={(e) => {
              this.inputChange(e);
              this.uniquePattern(e);
            }}
            pattern={fulldata[i]["FIELD_VALIDATION"]}
          />,
          <br></br>
        );
      } else if (fulldata[i]["FIELD_TYPE"] === "Dropdown") {
        res.push(
          <br></br>,
          <Dropdown
            width="50%"
            labelBeforeSelect={"Choose " + fulldata[i]["FIELD_LABEL"]}
            labelAfterSelect={fulldata[i]["FIELD_LABEL"]}
            onChange={this.typeChange}
            selectedItemId={
              this.state[this.props.item + "_" + fulldata[i]["DB_COLUMN"]]
            }
            required={fulldata[i]["FIELD_REQUIRED"]}
            withSearch={true}
          >
            {fulldata[i]["FIELD_VALUES"] &&
              fulldata[i]["FIELD_VALUES"].map((type) => (
                <DropdownOption
                  key={type.id}
                  itemId={
                    type.value +
                    "_" +
                    this.props.item +
                    "_" +
                    fulldata[i]["DB_COLUMN"] +
                    "_" +
                    fulldata[i]["FIELD_REQUIRED"]
                  }
                >
                  {type.value}
                </DropdownOption>
              ))}
          </Dropdown>,
          <br></br>
        );
      } else if (fulldata[i]["FIELD_TYPE"] === "Date")
        res.push(
          <br></br>,
          <DatePicker
            key={component.split("_")[1] + "_" + i}
            width="50%"
            id={this.props.item + "_" + fulldata[i]["DB_COLUMN"]}
            name="datePicker"
            value={this.state[this.props.item + "_" + fulldata[i]["DB_COLUMN"]]}
            selected={this.state.startDate}
            restricted={true}
            dateFormat="YYYY.MM.DD"
            label="Enter the date"
            required={fulldata[i]["FIELD_REQUIRED"]}
            calendarProps={{
              selectableDateRange: {
                startDay: "2000-01-01",
                endDay: "2050-01-01",
              },
              restricted: false,
              weekDaysOnly: false,
            }}
            onChange={this.handleChange_calender}
            message={
              this.state[
                this.props.item +
                  "_" +
                  fulldata[i]["DB_COLUMN"] +
                  "_errorMessage"
              ]
            }
            messageType={
              this.state[
                this.props.item +
                  "_" +
                  fulldata[i]["DB_COLUMN"] +
                  "_errorMessageType"
              ]
            }
            tooltip={fulldata[i]["FIELD_EXAMPLE"]}
          />,
          <br></br>
        );
    }
    var data = res;
    data.sort((a, b) => a.key - b.key);
    //console.log("Sorted data",data)
    var stepnumber = "";
    if (this.props.item.length >= 2) {
      var temp = this.props.item.split("#");
      if (temp) {
        stepnumber = temp[1];
      }
    }

    var varstepValid = "";
    console.log(
      "checking before",
      this.state[this.props.component + this.props.item]["Config9"]
    );
    varstepValid =
      this.props.item.at(-1) ===
        this.state[this.props.component + this.props.item]["Config9"] ||
      this.props.item.at(-1) ===
        this.state[this.props.component + this.props.item]["Config10"];
    console.log("varstepValid", varstepValid);
    if (varstepValid === true) {
      alert(
        "Next Success Sequence or Next Failure Sequence cannot have same value as of WSTEP, please check and submit again"
      );

      //    <Snackbar>CONFIG9 or CONFIG10 cannot have same value as of WSTEP, please check and submit again</Snackbar>
    }

    return (
      <div>
        <b>
          Step {stepnumber} - {this.props.component}
        </b>
        <div>{res}</div>
        {/* {console.log("in return", this.props.item.at(-1) === this.state[this.props.component + this.props.item]["Config9"] || this.props.item.at(-1) === this.state[this.props.component + this.props.item]["Config10"])} */}

        <div style={{ margin: "20px" }}>
          {varstepValid === true ? (
            <Button
              id={"button_next" + this.props.item.split("#")[1]}
              // type={Button.type.DELETE}
              size={Button.size.NORMAL}
              style={{ margin: "5px", width: "20%" }}
              disabled
            >
              Next
            </Button>
          ) : (
            <Button
              id={"button_next" + this.props.item.split("#")[1]}
              type={Button.type.DELETE}
              size={Button.size.NORMAL}
              style={{ margin: "5px", width: "20%" }}
              //disabled={true}

              onClick={() => {
                {
                  this.props.callback(
                    this.props.component + this.props.item,
                    this.state[this.props.component + this.props.item],
                    false,
                    true
                  );
                }
              }}
            >
              Next
            </Button>
          )}

          {/* <Button id={"button_delete" + this.props.item} type={Button.type.DELETE} size={Button.size.NORMAL} style={{ margin: "5px" }} onClick={() => this.props.callback2(this.props.component + this.props.item, this.props.item)}>Delete</Button> */}
          {console.log(
            "before submit",
            this.props.item,
            this.state[this.props.component + this.props.item]["Config9"]
          )}

          {varstepValid === true ? (
            <Button
              id={"button_submit" + this.props.item.split("#")[1]}
              size={Button.size.NORMAL}
              style={{ margin: "5px", display: "block", width: "20%" }}
              disabled
            >
              Submit
            </Button>
          ) : (
            // varstepValid=== true ?  window.alert("Please Select Pattern as your first component "):
            <Button
              id={"button_submit" + this.props.item.split("#")[1]}
              type={Button.type.SUBMIT}
              size={Button.size.NORMAL}
              style={{ margin: "5px", display: "block", width: "20%" }}
              onClick={() => {
                this.props.callback(
                  this.props.component + this.props.item,
                  this.state[this.props.component + this.props.item],
                  true,
                  true
                );
                this.props.handleSubmit(
                  this.props.component + this.props.item,
                  this.state[this.props.component + this.props.item],
                  true
                );
              }}
              //disabled={true}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    );
  }
}
class Add extends Component {
  state = {
    itemList: [],
    nextComponent: "",
    nextData: {},
    itemCount: 0,
    // disable: false,
    dd_disable1: false,
    flagfirst: false,
    response: [],
    trim_data: [],
    error_flag: false,
    all_validation: {},
    valueSelected: "",
    uploadExcel: false,
    shiftUpload: [],
    loading: false,
  };
  updateValidation = (key, input_val, unique_val) => {
    if (key == "Pattern#0") {
      this.state.all_validation[key] = input_val && unique_val;
    } else {
      this.state.all_validation[key] = input_val;
    }

    var all = Object.values(this.state.all_validation);
    var validation_failed = all.includes(false);

    var temp = true;
    if (validation_failed === true) {
      temp = true;
    } else {
      temp = false;
    }
    var id = Object.keys(this.state.nextData).length - 1;
    document.getElementById("button_submit" + id).disabled = temp;
    document.getElementById("button_next" + id).disabled =
      !this.state.all_validation[key];
  };

  updateCentral = (key, value) => {
    //var nextData = this.state.nextData;
    if (this.state.nextData.hasOwnProperty(key)) {
      Object.keys(value).map((v, k) => {
        this.state.nextData[key][v] = value[v];
      });
    } else {
      this.state.nextData[key] = value;
    }
    console.log("Central store", this.state.nextData);
  };

  callback = (key, value, flagSubmit, flagNext) => {
    var tempNext = document.getElementById("button_next" + key.split("#")[1]);
    var tempSubmit = document.getElementById(
      "button_submit" + key.split("#")[1]
    );

    if (
      (tempNext !== null && tempNext.disabled === false) ||
      (tempSubmit !== null && tempSubmit.disabled === false)
    ) {
      flagNext &&
        (document.getElementById(
          "button_next" + key.split("#")[1]
        ).style.display = "none");

      setTimeout(function () {
        document.getElementById(
          "button_submit" + key.split("#")[1]
        ).style.display = "none";
      }, 300);
      flagSubmit &&
        (document.getElementById(
          "button_next" + key.split("#")[1]
        ).style.display = "none");
      if (!flagSubmit) {
        this.setState({ itemCount: this.state.itemCount + 1 }, () => {
          var itemList = this.state.itemList;
          itemList.push("#" + this.state.itemCount);

          this.setState({ itemList: itemList });
        });
      }
      // }
    }
  };
  callback2 = (data, item) => {
    var index = this.state.itemList.indexOf(item);
    delete this.state.nextData[data];
    var itemList = this.state.itemList;
    itemList.splice(index, 1);
    this.setState({ itemList: itemList }, () => {
      console.log("nectD", this.state.nextData, itemList);
    });
    var keys = Object.keys(this.state.nextData);
  };

  handleSubmit = (key, value, flagSubmit) => {
    var tempSubmit = document.getElementById(
      "button_submit" + key.split("#")[1]
    );
    if (tempSubmit !== null && tempSubmit.disabled === false) {
      var res = [];
      res.push(<SpinningWheel width={150} height={50}></SpinningWheel>);
      this.setState({ response: res });
      var nextData = this.state.nextData;
      nextData[key] = value;
      this.setState({ nextData: nextData }, () => {
        console.log("aa nextdata in callback1", nextData);
      });

      Object.keys(nextData).map((v, i) => {
        Object.keys(nextData[v]).map((val, key) => {
          nextData[v][val] = nextData[v][val].trim();
          this.setState({ nextData: nextData[v][val].trim() });
        });
      });

      this.state.nextData["username"] = cookie.load("username");
      this.state.nextData["division"] = cookie.load("division");

      const url =
        process.env.REACT_APP_ROUTER_WEB_SERVICE + "/workflow/addConfig/";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(this.state.nextData),
        contentType: "application/json",
      };
      fetch(url, options)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          this.setState({ isLoading: false, downlines: data.response });

          var res = [];

          res.push(
            <MessageBox type="confirm">
              <MessageBox.Title tagName="h4">
                The details have been successfully submitted for approval.
                Please check in Status of Submitted Config Tab
              </MessageBox.Title>
            </MessageBox>
          );

          this.setState({ response: res });
        })
        .catch((error) => {
          if (error.length !== 0) {
            this.setState({ error_flag: true });
            console.log("flag", this.state.error_flag);
          }
          var Errorflag = this.state.error_flag;
          if (flagSubmit === true && Errorflag === true) {
            setTimeout(function () {
              Errorflag &&
                (document.getElementById(
                  "button_submit" + key.split("#")[1]
                ).style.display = "block");
            }, 300);
            !Errorflag &&
              (document.getElementById(
                "button_next" + key.split("#")[1]
              ).style.display = "none");
          }
          var res = [];
          res.push(
            <MessageBox type="error">
              <MessageBox.Title tagName="h4">
                Error in submitting details, please check if all values have
                been entered correctly. Contact DL-TOC-IBPostTrade-AIM if issue
                doesn't get resolved.
              </MessageBox.Title>
            </MessageBox>
          );
          this.setState({ response: res });
        });
    }
    // }
  };
  handleSubmitCSV = (newObj) => {
    var resultCSV = {};
    resultCSV = newObj;
    //Add check to ensure that the data added is correct for application name - allowed letters, numbers, '-' and space
    Object.entries(resultCSV).map(([key, entry]) => {
      // only those that are in WSTEP 0
      if (/.*#0$/.test(key)) {
        if (
          "Config5" in entry &&
          !/^([0-9a-zA-Z]|-| )+$/.test(entry["Config5"])
        ) {
          var res = [];
          res.push(
            <MessageBox type="error">
              <MessageBox.Title tagName="h4">
                Error in submitting details, please check if you have entered
                the application name with no special characters. Contact
                DL-TOC-IBPostTrade-AIM if issue doesn't get resolved.
              </MessageBox.Title>
            </MessageBox>
          );
          this.setState({ response: res });
          return;
        }
      }
    });

    newObj["username"] = cookie.load("username");
    newObj["division"] = cookie.load("division");

    const url_upload =
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/workflow/addConfig/";
    const options_upload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(resultCSV),
      contentType: "application/json",
    };

    fetch(url_upload, options_upload)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        this.setState({ isLoading: false, downlines: data.response });

        var res = [];

        res.push(
          <MessageBox type="confirm">
            <MessageBox.Title tagName="h4">
              The details have been successfully submitted for approval. Please
              check in Status of Submitted Config Tab
            </MessageBox.Title>
          </MessageBox>
        );

        this.setState({ response: res });
      })
      .catch((error) => {
        var res = [];
        res.push(
          <MessageBox type="error">
            <MessageBox.Title tagName="h4">
              Error in submitting details, please check if all values have been
              entered correctly. Contact DL-TOC-IBPostTrade-AIM if issue doesn't
              get resolved.
            </MessageBox.Title>
          </MessageBox>
        );
        this.setState({ response: res });
      });
    // }
  };
  handleChange = (e) => {
    var s = e.selectedItemId.split("_")[1] + "_selected";
    var d = e.selectedItemId.split("_")[1] + "_disabled";

    this.setState({ [d]: true }, () => {
      console.log(d, e.selectedItemId);
    });

    this.setState({ [s]: e.selectedItemId }, () => {
      // console.log(s, e.selectedItemId)
    });
  };
  handleDisable = (item) => {
    var items = [];
    Object.keys(this.state.nextData).map((v, k) => {
      items.push(v.split("#")[1]);
    });
    return items.includes(item.split("#")[1]);
  };
  componentDidMount() {
    fetch(
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/ui/fields/generic_workflow/"
    )
      .then((data) => data.json())
      .then((res) => {
        this.setState(
          {
            fulldata: res,
          },
          () => {}
        );
      });
  }
  handleChangeOption = ({ target: { valueSelected } }) => {
    this.setState({ valueSelected });
    valueSelected === 2
      ? this.setState({ uploadExcel: true })
      : this.setState({ uploadExcel: false });
  };

  checkExcel = () => {
    this.setState({ uploadExcel: true });
  };
  checkUI = () => {
    this.setState({ uploadExcel: false });
  };
  handleDownLoadFile = () => {
    fetch(
      process.env.REACT_APP_ROUTER_WEB_SERVICE +
        "/workflow_edit/downloadWorkflowTemplate",
      {
        headers: {
          "Content-Type": "text/csv",
        },
        responseType: "blob",
      }
    )
      .then((response) => response.blob())
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "WorkflowTemplate.csv");
        document.body.appendChild(link);
        link.click();
      });
  };

  fileHandler = (event) => {
    this.setState({
      uploadFlag: false,
      loading: true,
      shiftError: false,
      dateError: false,
      gpnError: false,
      validationLoading: true,
    });
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.setState({
          uploadFlag: true,
          shiftUpload: result["data"],
          loading: false,
        });
      },
    });
  };

  render() {
    const subheading = {
      color: "red",
      // padding: "10px",
      fontFamily: "sans-serif",
      position: "centre",
      fontWeight: "bold",
      margin: "0px 0px",
      size: "15pt ",
    };
    const newObj = {};

    this.state.shiftUpload.map((item) => {
      const {
        WSTEP,
        WACTION,
        Config1,
        Config2,
        Config3,
        Config4,
        Config5,
        Config6,
        Config7,
        Config8,
        Config9,
        Config10,
        Description,
      } = item;
      newObj[`${WACTION}#${WSTEP}`] = {
        Config1,
        Config2,
        Config3,
        Config4,
        Config5,
        Config6,
        Config7,
        Config8,
        Config9,
        Config10,
        Description,
      };
    });
    return (
      <div>
        <br></br>
        <br></br>

        {this.state.uploadExcel === false && (
          <div>
            <Button
              size={Button.size.SMALL}
              style={{ width: "15%", float: "right" }}
              // type={Button.type.INFO}
              onClick={this.checkExcel}
            >
              Add config through Excel
            </Button>
          </div>
        )}
        {this.state.uploadExcel === true && (
          <div>
            <Button
              size={Button.size.SMALL}
              style={{ width: "15%", float: "right" }}
              // type={Button.type.INFO}
              onClick={this.checkUI}
            >
              Add config through UI
            </Button>
          </div>
        )}
        {this.state.uploadExcel === true && (
          <div>
            <br></br>
            <br></br>
          </div>
        )}

        {this.state.uploadExcel === true && (
          <div style={{ display: "flex", padding: "0px" }}>
            <Button
              className="btn"
              type={Button.type.INFO}
              onClick={this.handleDownLoadFile}
              style={{ width: "17%" }}
            >
              Download Template
            </Button>{" "}
            &nbsp;
            <input
              type="file"
              name="AddWorkflow"
              accept=".csv"
              onChange={this.fileHandler}
              style={{ display: "block", margin: "10px auto" }}
            />
          </div>
        )}
        {this.state.uploadExcel === true && (
          <div>
            {" "}
            <p>
              <br></br>Please refer{" "}
              <a href="https://sdlc-agile.swissbank.com/confluence/display/tocibopsaim/Generic+Workflow-based+Automation">
                Confluence
              </a>{" "}
              page for validations while adding new workflow<br></br>
            </p>
          </div>
        )}

        {/* {this.state.uploadExcel === true && <p><br></br>Please refer this page for validations while adding new workflow<br></br></p>} */}
        {this.state.uploadExcel === true &&
          this.state.loading &&
          this.state.shiftUpload.length === 0 && <SpinningWheel />}
        {this.state.uploadExcel === true && (
          <div>
            <br></br>

            {
              this.state.uploadExcel === true &&
                Object.keys(this.state.shiftUpload).length !== 0 &&
                Object.keys(this.state.shiftUpload).length !== 0 && (
                  <Editable data={this.state.shiftUpload} />
                )

              // : (this.state.uploadExcel === true && this.state.loading &&
              //     <SpinningWheel />
              // )
            }
            <br />
          </div>
        )}
        {this.state.uploadExcel === true &&
          Object.keys(this.state.shiftUpload).length !== 0 && (
            <Button
              type={Button.type.SUBMIT}
              size={Button.size.NORMAL}
              style={{ margin: "5px", display: "block", width: "20%" }}
              onClick={() => {
                this.handleSubmitCSV(newObj);
              }}
              //disabled={true}
            >
              Submit
            </Button>
          )}
        {this.state.uploadExcel === true && (
          <div>
            {this.state.response}
            {this.state.msgsError}
          </div>
        )}

        {/* ----------------------------------------- UI code ------------------------------------------------ */}
        <br></br>
        {this.state.uploadExcel === false && (
          <p>
            Fields marked with <b style={subheading}>*</b> are mandatory
          </p>
        )}

        <br />
        {this.state.uploadExcel === false && !this.state.fulldata && (
          <SpinningWheel width={500} height={150} gray />
        )}
        {this.state.uploadExcel === false && this.state.fulldata && (
          <RenderComponent
            component={"Pattern"}
            fulldata={this.state.fulldata["Pattern"]}
            callback={this.callback}
            callback2={this.callback2}
            handleSubmit={this.handleSubmit}
            finaldata={this.state.nextData}
            item={"#0"}
            updateCentral={this.updateCentral}
            updateValidation={this.updateValidation}
          />
        )}
        {this.state.uploadExcel === false &&
          Object.keys(this.state.nextData).length !== 0 &&
          this.state.itemList.map((item) => (
            <div>
              <br></br>
              <Dropdown
                id={item}
                padding="20px"
                labelBeforeSelect="Choose Next Component"
                width="40%"
                withSearch={true}
                onChange={this.handleChange}
                //onClick={this.handleClick}
                //disabled={ this.handleDisable(item)}
                selectedItemId={this.state[item + "_selected"]}
                hint=""
              >
                <DropdownOption itemId={"RunWindowCheck_" + item}>
                  RunWindowCheck
                </DropdownOption>
                <DropdownOption itemId={"Regex_" + item}>Regex</DropdownOption>
                <DropdownOption itemId={"RunCheckAutosysJob_" + item}>
                  RunCheckAutosysJob
                </DropdownOption>
                <DropdownOption itemId={"LogsCheck_" + item}>
                  LogsCheck
                </DropdownOption>
                <DropdownOption itemId={"RunCommand_" + item}>
                  RunCommand
                </DropdownOption>
                <DropdownOption itemId={"CompareVariable_" + item}>
                  CompareVariable
                </DropdownOption>
                <DropdownOption itemId={"DatabaseCheck_" + item}>
                  DatabaseCheck
                </DropdownOption>
                <DropdownOption itemId={"CreateINCTicket_" + item}>
                  Create INCIDENT Ticket{" "}
                </DropdownOption>
                <DropdownOption itemId={"Wait_" + item}>Wait</DropdownOption>
                <DropdownOption itemId={"QueueCheck_" + item}>
                  Queue Check
                </DropdownOption>
                {cookie.load("division") === "AM" && (
                  <DropdownOption itemId={"Nosudorun_" + item}>
                    Nosudorun
                  </DropdownOption>
                )}
              </Dropdown>
              <div>
                <br></br>
                {this.state[item + "_selected"] && this.state.fulldata && (
                  <RenderComponent
                    component={this.state[item + "_selected"].split("_")[0]}
                    fulldata={
                      this.state.fulldata[
                        this.state[item + "_selected"].split("_")[0]
                      ]
                    }
                    callback={this.callback}
                    callback2={this.callback2}
                    handleSubmit={this.handleSubmit}
                    finaldata={this.state.nextData}
                    item={item}
                    updateCentral={this.updateCentral}
                    updateValidation={this.updateValidation}
                    // disabled={this.state.disable}
                  />
                )}
                <br></br>
              </div>
            </div>
          ))}
        {this.state.uploadExcel === false && (
          <div>
            {this.state.response}
            {this.state.msgsError}
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Add);
