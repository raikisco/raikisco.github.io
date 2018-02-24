import React from "react";
import styled from "react-emotion";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select-plus";
import "react-select-plus/dist/react-select-plus.css";
import moment from "moment";

//Import core
import { Section, SectionContent, Button } from "core/";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Overlay = styled("div")`
  position: fixed;
  background-color: ${props =>
    props.visible ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)"};
  width: 100vw;
  height: 100vh;
  z-index: ${props => (props.visible ? 10 : 0)};
  transition: all 0.9s;
`;

const ModalBg = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 20px;
  max-width: 700px;
  max-height: 80%;
  height: ${props => (props.visible ? "80%" : "0%")};
  opacity: ${props => (props.visible ? 1 : 0)};
  @media (max-width: 750px) {
    padding: 20px 30px;
    width: calc(100% - 65px);
  }
  padding: 30px 50px;
  width: calc(100% - 120px);
  transition: all 0.9s;
  text-align: center;
`;

const CloseBtn = styled("div")`
  cursor: pointer;
  display: inline;
  float: right;
`;

const BoldTitle = styled("h4")`
  font-weight: 600;
`;

const BookButton = styled(Button)`
  position: absolute;
  top:100%;
  left:50%;
  transform:translate(-50%,-120%)
`
export default function BookingModal(props) {
  return (
    <Overlay visible={props.modalOpen}>
      <ModalBg visible={props.modalOpen}>
        <div style={{ position: "relative", height:'100%' }}>
          <div>
            <h3 style={{ display: "inline", fontWeight: 600 }}>Book Now</h3>
            <CloseBtn onClick={props.onToggleModal}>
              <u>Close</u>
            </CloseBtn>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <BoldTitle>Step 1.</BoldTitle>
              Select your service
              <Select
                // name="form-field-name"
                // value={}
                // onChange={this.handleChange}
                options={[
                  { value: "one", label: "One" },
                  { value: "two", label: "Two" }
                ]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <BoldTitle>Step 2.</BoldTitle>
              Select the duration
              <Select
                // name="form-field-name"
                // value={}
                // onChange={this.handleChange}
                options={[
                  { value: "one", label: "One" },
                  { value: "two", label: "Two" }
                ]}
              />
            </div>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <BoldTitle>Step 3.</BoldTitle>
            Select your desired date & time.
          </div>
          <div style={{ height: "50%", marginTop: "10px" }}>
            <BigCalendar
              events={[]}
              startAccessor="startDate"
              endAccessor="endDate"
            />
          </div>
          <br/>
          <BookButton color='grey'>Book Now!</BookButton>
        </div>
      </ModalBg>
    </Overlay>
  );
}
