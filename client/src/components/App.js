import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { ThemeProvider } from "styled-components";
import theme from "../stylings/theme";
import { Flexcon } from "../stylings";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Landing from "./layout/Landing";
import Alert from "./layout/Alert";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { loadUser } from "../actions/auth";

const flex = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  alignItems: "center"
};

const alerts = {
  marginTop: "70px",
  position: "absolute",
  width: "100%",
  maxWidth: "70%",
  display: "flex",
  flexDirection: "column"
};

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <div style={flex}>
            <Navbar />
            <section style={alerts}>
              <Alert />
            </section>
            <Flexcon>
              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Flexcon>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
}

export default connect(null, { loadUser })(App);
