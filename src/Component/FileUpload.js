import React, { useState, useEffect } from "react";
import axios from "axios";

export const FileUpload = (props) => {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    console.log("hello", e.target.files[0]);
    setInput(e.target.files[0]);
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("input", input);
    const dataForm = new FormData();
    console.log("input submit", input);
    dataForm.append("image", input);
    console.log("dataform", dataForm.get("image"));
    try {
      let response = await axios.post("/uploadimg", dataForm);
      console.log("response", response.data);
      console.log("filename", response.data.filename);
      setFileName(response.data.filename);
      setMsg(response.data.msg);
    } catch (e) {
      console.log(e);
      setMsg(e.response.data.msg);
    }
  };

  return (
    <>
      <div>FileUpload</div>
      <div>
        <form enctype="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="file"
            name="image"
            onChange={(e) => handleChange(e)}
            accept="image/*"
          />
          <input type="submit" value="Upload Photo" />
        </form>
      </div>
      <img
        src={`${process.env.REACT_APP_SERVERURL}${fileName}`}
        width={"800px"}
      ></img>
    </>
  );
};

export default FileUpload;
