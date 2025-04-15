import React, { useState } from "react";
import Papa from "papaparse";
import { Button, MessageBox, SpinningWheel } from "uwr-react-widgets";

const ExcelUploadSection = () => {
  const [shiftUpload, setShiftUpload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const fileHandler = (event) => {
    setLoading(true);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setShiftUpload(result.data);
        setLoading(false);
      },
    });
  };

  const handleSubmitCSV = () => {
    // Submit parsed CSV data
    const url =
      process.env.REACT_APP_ROUTER_WEB_SERVICE + "/workflow/addConfig/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shiftUpload),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(
          <MessageBox type="confirm">
            <MessageBox.Title tagName="h4">
              The details have been successfully submitted for approval.
            </MessageBox.Title>
          </MessageBox>
        );
      })
      .catch(() => {
        setResponse(
          <MessageBox type="error">
            <MessageBox.Title tagName="h4">
              Error in submitting details. Please try again.
            </MessageBox.Title>
          </MessageBox>
        );
      });
  };

  return (
    <div>
      <Button
        className="btn"
        type={Button.type.INFO}
        onClick={() =>
          window.open(
            process.env.REACT_APP_ROUTER_WEB_SERVICE +
              "/workflow_edit/downloadWorkflowTemplate"
          )
        }
        style={{ width: "17%" }}
      >
        Download Template
      </Button>
      <input
        type="file"
        name="AddWorkflow"
        accept=".csv"
        onChange={fileHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
      {loading && <SpinningWheel />}
      {shiftUpload.length > 0 && (
        <Button
          type={Button.type.SUBMIT}
          size={Button.size.NORMAL}
          onClick={handleSubmitCSV}
        >
          Submit
        </Button>
      )}
      {response}
    </div>
  );
};

export default ExcelUploadSection;
