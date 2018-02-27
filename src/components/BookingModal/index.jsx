import React from "react";
import styled from "react-emotion";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select-plus";
import "react-select-plus/dist/react-select-plus.css";

//Import core
import { Section, SectionContent, Button } from "components/core";

//Import components
import Calendar from "./Components/Calendar";
import ContactInfoForm from "./Components/ContactInfoForm";
import PayPalButton from './Components/PayPalButton';

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

const ModalContent = styled("div")`
  position: relative;
  height: calc(100% - 50px);
  overflow: scroll;
`;
const ModalHeader = styled("div")`
  height: 40px;
  position: relative;
`;

const CloseBtn = styled("div")`
  cursor: pointer;
  position: absolute;
  left: 100%;
  top: 0;
  transform: translateX(-120%);
`;

const BoldTitle = styled("h4")`
  font-weight: 600;
`;

const BookButton = styled(Button)`
  margin-top: 20px;
`;

const InputLabels = styled("div")`
  ${props => props.disabled && "opacity:0.2"};
  margin-bottom: 10px;
`;

const InputTitle = p => (
  <InputLabels>
    <BoldTitle>{p.title}</BoldTitle>
    {p.subTitle}
  </InputLabels>
);

export default function BookingModal(props) {
  return (
    <Overlay visible={props.modalOpen}>
      <ModalBg visible={props.modalOpen}>
        <ModalHeader>
          <h3 style={{ display: "inline", fontWeight: 600 }}>Book Now</h3>
          <CloseBtn onClick={props.onToggleModal}>
            <u>Close</u>
          </CloseBtn>
        </ModalHeader>
        <ModalContent>
          <br />
          <div style={{ textAlign: "center" }}>
            <InputTitle title="Step 1." subTitle="How do we contact you?" />
            <ContactInfoForm
              values={props.bookingValues}
              onChange={props.onBookingChange}
            />
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 3, zIndex: 6 }}>
              <InputTitle title="Step 2." subTitle="Select your service" />
              <Select
                value={props.bookingValues.service}
                onChange={props.onBookingChange.bind(null, "service")}
                clearable={false}
                searchable={false}
                disabled={!props.bookingValues.phone}
                options={[
                  { value: "swedish", label: "Swedish Massage" },
                  { value: "deepTissue", label: "Deep Tissue Massage" },
                  { value: "shiatsu", label: "Shiatsu Massage" },
                  { value: "aromatherapy", label: "Aromatherapy Massage" },
                  { value: "reflexology", label: "Reflexology Foot Massage" },
                  {
                    value: "integrated",
                    label: "Integrated Whole Body Massage"
                  }
                ]}
              />
            </div>
            <div style={{flex:1}}/>
            <div style={{ flex: 3 }}>
              <InputTitle title="Step 3." subTitle="Select the duration" />
              <Select
                value={props.bookingValues.duration}
                onChange={props.onBookingChange.bind(null, "duration")}
                clearable={false}
                searchable={false}
                disabled={!props.bookingValues.service}
                options={[
                  { value: "60", label: "60 Min" },
                  { value: "90", label: "90 Min" }
                ]}
              />
            </div>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <InputTitle title="Step 4." subTitle="Select your date & time." />
          </div>
          <Calendar
            bookingValues={props.bookingValues}
            events={props.events || []}
            onChangeEvents={props.onChangeEvents}
            onError={props.onCalendarError}
            error={props.error}
          />
          <br />
          <PayPalButton/>
        </ModalContent>
      </ModalBg>
    </Overlay>
  );
}
