import React, { Component } from "react";
import styled from "react-emotion";
import { hot } from "react-hot-loader";
import "./app.css";

//Import Components
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Qualifications from "./components/Qualifications";
import Services from "./components/Services";
import Contact from "./components/Contact";
import BookingModal from "./components/BookingModal";

class App extends Component {
  constructor() {
    super();
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.state = {
      modalOpen: false,

    };
  }
  handleToggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    return (
      <div>
        <BookingModal
          modalOpen={this.state.modalOpen}
          onToggleModal={this.handleToggleModal}
        />
        <Hero onToggleModal={this.handleToggleModal} />
        <Profile />
        <Qualifications />
        <Services onToggleModal={this.handleToggleModal} />
        <Contact />
      </div>
    );
  }
}

export default hot(module)(App);
