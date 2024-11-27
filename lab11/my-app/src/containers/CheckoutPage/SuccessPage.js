import React from "react";
import { Link } from "react-router-dom";
import DocumentTitle from "../../components/helmet/document_title.js";  
import { CheckCircleFilled } from "@ant-design/icons";
import "./SuccessPage.css";


function SuccessPage() {
  DocumentTitle("SuccessPage");

  return (

    <div className="success">
      <CheckCircleFilled 
      style={{ fontSize: '500%', marginBottom: "20px"}}/>
      <h1 className="success_title">Success!</h1>
      <div className="success_text">
        <p>Your order was sent to processing!</p>
        <p>Check your e-mail box for further information.</p>
      </div>
      <Link to="/catalog">
        <button className="go_back_button">Back to catalog</button>
      </Link>
    </div>
  );
}

export default SuccessPage;