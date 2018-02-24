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
  position: relative;
  top: 100%;
`;

const CalendarWrapper = styled("div")`
  height: 70%;
  margin-top: 10px;
  z-index: 0;
  position: relative;
`;
const CalendarOverlay = styled("div")`
  background-color: white;
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 5;
  cursor: not-allowed;
`;
const InputLabels = styled("div")`
  ${props => props.disabled && "opacity:0.2"};
  margin-bottom: 10px;
`;

export default function BookingModal(props) {
  console.log("events from props are", props.events);
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
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, zIndex: 6 }}>
              <InputLabels>
                <BoldTitle>Step 2.</BoldTitle>
                Select your service
              </InputLabels>
              <Select
                value={props.bookingValues.service}
                onChange={props.onBookingChange.bind(null, "service")}
                clearable={false}
                searchable={false}
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
            <div style={{ flex: 1 }}>
              <InputLabels disabled={!props.bookingValues.service}>
                <BoldTitle>Step 3.</BoldTitle>
                Select the duration
              </InputLabels>
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
            <InputLabels
              disabled={
                !props.bookingValues.service || !props.bookingValues.duration
              }
            >
              <BoldTitle>Step 4.</BoldTitle>
              Select your desired date & time.
            </InputLabels>
          </div>
          <CalendarWrapper>
            {(!props.bookingValues.service ||
              !props.bookingValues.duration) && <CalendarOverlay />}
            <BigCalendar
              events={props.events || []}
              defaultDate={new Date()}
              views={["month", "week", "day"]}
              selectable={true}
              getDrilldownView={(
                targetDate,
                currentViewName,
                configuredViewNames
              ) => {
                let currentDate = new Date();
                let tomorrow = currentDate.setDate(currentDate.getDate() + 1);
                if (targetDate > tomorrow) return "day";
                return null;
              }}
              min={new Date(2017, 10, 0, 10, 0, 0)}
              max={new Date(2017, 10, 0, 22, 0, 0)}
              dayPropGetter={date => {
                let currentDate = new Date();
                let tomorrow = currentDate.setDate(currentDate.getDate() + 1);
                if (date < tomorrow) {
                  return {
                    className: null,
                    style: { backgroundColor: "red", opacity: 0.4 }
                  };
                }
              }}
              onSelectSlot={
                slotInfo => {
                  if (
                    Math.floor((slotInfo.end - slotInfo.start) / 1000 / 60) !==
                      parseInt(props.bookingValues.duration.value)
                  ) { //if all day event or length is wrong!
                    return;
                  }
                  let events = props.events || [];
                  events.push({
                    start: slotInfo.start,
                    end: slotInfo.end,
                    title: props.bookingValues.service.label
                  });
                  props.onChangeEvents(events);
                }
                // console.log(
                //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                //     `\nend: ${slotInfo.end.toLocaleString()}` +
                //     `\naction: ${slotInfo.action}`
                // )
              }
              step={
                (props.bookingValues.duration &&
                  parseInt(props.bookingValues.duration.value)) ||
                0
              }
            />
          </CalendarWrapper>
          <br />
          <BookButton color="grey">Book Now!</BookButton>
        </ModalContent>
      </ModalBg>
    </Overlay>
  );
}
