import React, { Component } from "react";
import styled from "react-emotion";
import { hot } from "react-hot-loader";
import "./app.css";

//Import Components
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Qualifications from "./components/Qualifications";
import Services from './components/Services';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hero />
        <Profile />
        <Qualifications />
        <Services/>
        <Contact/>
      </div>
    );
  }
}

export default hot(module)(App);
