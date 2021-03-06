import React, { Component } from "react";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input
} from "reactstrap";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "./actions/createUser";
import { login } from "./actions/login";

import "./App.css";
import Body from "./components/Body";
import NavPannel from "./components/NavPannel";

class App extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <Route path="/">
        <div className="App">
          <Row
            className="appContainer"
            style={{ width: "100%", minHeight: "100vh" }}
          >
            <Col
              xs="3"
              style={{
                maxWidth: "250px",
                backgroundColor: "#D8D8D8"
              }}
            >
              <NavPannel xs="3" />
            </Col>
            <Col style={{ backgroundColor: "#F4F4F4" }}>
              <div className={this.props.loggedIn ? null : "d-none"}>
                <Body />
              </div>
            </Col>
          </Row>
          <Modal
            isOpen={!this.props.loggedIn}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader className="text-center mt-4">
              Login or Create Account to continue.
            </ModalHeader>
            <Form>
              <ModalBody className="text-center">
                <Input
                  className="mb-2"
                  required
                  type="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
                <Input
                  required
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                {/* </ModalBody>
              <ModalBody className="d-flex justify-content-center"> */}
                <ModalFooter>
                  <Button
                    color="secondary"
                    style={{ width: "175px", margin: "10px 10px 20px 10px" }}
                    onClick={this.singInClicked}
                  >
                    Login
                  </Button>{" "}
                  <Button
                    style={{ width: "175px", margin: "10px 10px 20px 10px" }}
                    color="success"
                    onClick={this.createUserClicked}
                  >
                    Create Account
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Form>
          </Modal>
        </div>
      </Route>
    );
  }

  singInClicked = event => {
    event.preventDefault();
    this.props.users.forEach(user => {
      if (
        user.username === this.state.username &&
        user.password === this.state.password
      ) {
        alert("Login successful");
        this.props.login();
        this.setState({
          username: "",
          password: ""
        });
      }
    });
  };

  createUserClicked = event => {
    event.preventDefault();
    let userExists = false;
    console.log("create clicked", this.props);
    this.props.users.forEach(user => {
      if (user.username === this.state.username) {
        userExists = true;
        console.log(userExists);
      }
    });
    if (userExists === false) {
      if (this.state.password.length < 8) {
        alert("Password must be at least 8 characters.");
      } else {
        alert("Account created successfully!");
        this.props.createUser(this.state);
        this.setState({
          username: "",
          password: ""
        });
      }
    } else {
      alert("UserName already exists!  Please use another UserName");
    }
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
}

const mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps, { createUser, login })(App);
