import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const pstyle = {
  fontColor: "black",
  fontSize: "20px",
  marginTop: "50px"
};

const Landing = () => {
  return (
    <Fragment>
      <p style={pstyle}>Home/Landing</p>
      <ul>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Landing;
