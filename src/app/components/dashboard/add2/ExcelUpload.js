import React, { useState } from "react";
import Papa from "papaparse";
import { Button, SpinningWheel } from "uwr-react-widgets";

const ExcelUpload = () => {
  const [loading, setLoading] = useState(false);
  const [shiftUpload, setShiftUpload] = useState([]);

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

  return (
    <div>
      <Button>Download Template</Button>
      <input type="file" onChange={fileHandler} />
      {loading && <SpinningWheel />}
      {shiftUpload.length > 0 && <div>File uploaded successfully</div>}
    </div>
  );
};

export default ExcelUpload;
