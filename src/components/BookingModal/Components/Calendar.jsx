import React from "react";
import styled from "react-emotion";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import clone from "clone";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const CalendarWrapper = styled("div")`
  height: 70%;
  margin-top: 10px;
  z-index: 0;
  position: relative;
`;
const CalendarOverlay = styled("div")`
  background-color: white;
  opacity: 0.6;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 5;
  cursor: not-allowed;
`;

//TODO:
// on successful payment, push new event to google calendar, redirect to success page
function isDateAvail(date, unavailableDates) {
  let currentDate = new Date();
  let dateFormatted = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  if (unavailableDates) {
    if (
      unavailableDates.find(unavailDay => {
        if (
          date.getFullYear() == unavailDay.getFullYear() &&
          date.getMonth() + 1 == unavailDay.getMonth() &&
          date.getDate() == unavailDay.getDate()
        ) {
          return true;
        }
        return false;
      })
    ) {
      //date is unavailable
      return false;
    }
  }

  let tomorrow = currentDate.setDate(currentDate.getDate());
  if (date < tomorrow) {
    //date is in the past
    return false;
  }
  return true;
}

export default class Calendar extends React.Component {
  render() {
    let props = this.props;
    var totalEvents = props.events || [];
    if (props.newEvent) {
      totalEvents = totalEvents.slice(0);
      totalEvents.push(props.newEvent);
    }
    return (
      <CalendarWrapper>
        {(!props.bookingValues.service || !props.bookingValues.duration) && (
          <CalendarOverlay />
        )}
        {
          <div style={{ color: "red", paddingBottom: 10 }}>
            {props.error || " "}
          </div>
        }
        <BigCalendar
          events={totalEvents}
          defaultDate={new Date()}
          views={["month", "week", "day"]}
          selectable={true}
          getDrilldownView={(
            targetDate,
            currentViewName,
            configuredViewNames
          ) => {
            return isDateAvail(targetDate, this.props.unavailableDates)
              ? "day"
              : null;
          }}
          min={new Date(2017, 10, 0, 10, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
          dayPropGetter={date => {
            if (!isDateAvail(date, this.props.unavailableDates)) {
              return {
                className: null,
                style: { backgroundColor: "red", opacity: 0.4 }
              };
            }
          }}
          onSelectSlot={slotInfo => {
            if (
              Math.floor((slotInfo.end - slotInfo.start) / 1000 / 60) !==
              parseInt(props.bookingValues.duration.value)
            ) {
              //if all day event or length is wrong!
              return;
            }
            let events = props.events || [];
            //loop through all events and see if there's confclit!
            for (let event of events) {
              //see if slotinfo end is between the start and end of an event
              if (
                (slotInfo.end >= event.start && slotInfo.end <= event.end) ||
                (slotInfo.start >= event.start && slotInfo.start <= event.end)
              ) {
                props.onError(
                  "Uhoh! The selected time is too close to another booking. Please try a different time."
                );
                return;
              }
            }
            props.onChangeEvents({
              start: slotInfo.start,
              end: slotInfo.end,
              title: props.bookingValues.service.label
            });
          }}
          step={
            (props.bookingValues.duration &&
              parseInt(props.bookingValues.duration.value)) ||
            0
          }
        />
      </CalendarWrapper>
    );
  }
}
