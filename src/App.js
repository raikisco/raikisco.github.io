import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "react-emotion";
import { hot } from "react-hot-loader";
import "./app.css";
import Scroll from "react-scroll";

//Import Components
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Qualifications from "./components/Qualifications";
import Services from "./components/Services";
import Contact from "./components/Contact";
import BookingModal from "./components/BookingModal";

var scroll = Scroll.animateScroll;

class App extends Component {
  constructor() {
    super();
    // this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleScrollToServices = this.handleScrollToServices.bind(this);
    this.state = {
      modalOpen: false
    };
  }
  componentDidMount() {
    this.setState({
      client: true
    });
  }
  handleScrollToServices() {
    if (this.state.client) {
      let scrollTop = parseInt(
        document.getElementById("services").getBoundingClientRect().top,
        // ReactDOM.findDOMNode(this.services).getBoundingClientRect().top,
        10
      );
      scroll.scrollTo(scrollTop);
    }
  }
  render() {
    return (
      <div onScroll={this.handleOnScroll}>
        {/* <BookingModalx
              modalOpen={this.state.modalOpen}
              onToggleModal={this.handleToggleModal}
            /> */}

        <Hero onScrollToServices={this.handleScrollToServices} />
        <Profile />
        <Qualifications />
        <Services
          id='services'
          onToggleModal={this.handleToggleModal}
          ref={c => (this.services = c)}
        />
        <Contact />
      </div>
    );
  }
}

export default hot(module)(App);
