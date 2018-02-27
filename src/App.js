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
    this.handleBookingValue = this.handleBookingValue.bind(this);
    this.handleChangeEvents = this.handleChangeEvents.bind(this);
    this.handleCalendarError = this.handleCalendarError.bind(this);
    this.state = {
      modalOpen: false,
      bookingValues:{},
      events:[]
    };
  }
  handleCalendarError(error){
    this.setState({
      calendarError:error
    })
  }
  handleToggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
  handleBookingValue(id,value){
    let newBookingVal = {
      ...this.state.bookingValues,
      [id]:value
    }
    this.setState({bookingValues:newBookingVal});
  }
  handleChangeEvents(events){
    this.setState({
      events,
      calendarError:null
    });
  }
  render() {
    return (
      <div>
        <BookingModal
          modalOpen={this.state.modalOpen}
          onToggleModal={this.handleToggleModal}
          bookingValues={this.state.bookingValues}
          onBookingChange={this.handleBookingValue}
          onChangeEvents={this.handleChangeEvents}
          events={this.state.events}
          error={this.state.calendarError}
          onCalendarError={this.handleCalendarError}
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
