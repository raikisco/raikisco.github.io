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
import PayPalButton from "./Components/PayPalButton";
import { doFetch, doPush } from "./utils";
import serviceData from "./services.json";

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

export default class BookingModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCalendarError = this.handleCalendarError.bind(this);
    this.handleBookingValue = this.handleBookingValue.bind(this);
    this.handleChangeEvents = this.handleChangeEvents.bind(this);
    this.handlePaymentComplete = this.handlePaymentComplete.bind(this);
    this.state = {
      bookingValues: {},
      events: []
    };
  }
  componentDidMount() {
    doFetch().then(res => {
      if (res.items) {
        var modifiedItems = [];
        var unavailableDates = [];
        res.items.forEach(item => {
          if (item.start.dateTime) {
            //deal with start
            let sdP = item.start.dateTime.split(/-|T|:/);
            console.log("startDateParams", sdP);
            let startDate = new Date(
              sdP[0],
              sdP[1] - 1,
              sdP[2],
              sdP[3],
              sdP[4],
              sdP[5]
            );
            let edP = item.end.dateTime.split(/-|T|:/);
            let endDate = new Date(
              edP[0],
              edP[1] - 1,
              edP[2],
              edP[3],
              edP[4],
              edP[5]
            );
            modifiedItems.push({
              ...item,
              start: startDate,
              end: endDate,
              title: item.summary
            });
          } else {
            let sdP = item.start.date.split(/-|T|:/);
            let edP = item.end.date.split(/-|T|:/);
            unavailableDates.push(new Date(sdP[0], sdP[1], sdP[2]));
            // modifiedItems.push({
            //   start: new Date(sdP[0], sdP[1] - 1, sdP[2], 1),
            //   end: new Date(edP[0], edP[1] - 1, sdP[2], 23),
            //   title: item.summary,
            //   allDay: true
            // });
          }
        });
        this.setState({ events: modifiedItems, unavailableDates });
      }
    });
  }
  handleCalendarError(error) {
    this.setState({
      calendarError: error
    });
  }
  handleBookingValue(id, value) {
    let newBookingVal = {
      ...this.state.bookingValues,
      [id]: value
    };
    this.setState({ bookingValues: newBookingVal });
  }
  handleChangeEvents(newEvent) {
    this.setState({
      newEvent,
      calendarError: null
    });
  }
  handlePaymentComplete(){
    doPush(this.state.newEvent, this.state.bookingValues)
  }
  render() {
    let props = this.props;
    let bookValues = this.state.bookingValues;
    return (
      <Overlay visible={props.modalOpen}>
        <ModalBg visible={props.modalOpen}>
          <ModalHeader>
            <h3 style={{ display: "inline", fontWeight: 600 }}>Book Now</h3>
            {/* <CloseBtn onClick={props.onToggleModal}> */}
            <CloseBtn onClick={this.handlePaymentComplete}>
              <u>Close</u>
            </CloseBtn>
          </ModalHeader>
          <ModalContent>
            <br />
            <div style={{ textAlign: "center" }}>
              <InputTitle title="Step 1." subTitle="How do we contact you?" />
              <ContactInfoForm
                values={this.state.bookingValues}
                onChange={this.handleBookingValue}
              />
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3, zIndex: 6 }}>
                <InputTitle title="Step 2." subTitle="Select your service" />
                <Select
                  value={this.state.bookingValues.service}
                  onChange={this.handleBookingValue.bind(null, "service")}
                  clearable={false}
                  searchable={false}
                  disabled={!this.state.bookingValues.phone}
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
              <div style={{ flex: 1 }} />
              <div style={{ flex: 3 }}>
                <InputTitle title="Step 3." subTitle="Select the duration" />
                <Select
                  value={this.state.bookingValues.duration}
                  onChange={this.handleBookingValue.bind(null, "duration")}
                  clearable={false}
                  searchable={false}
                  disabled={!this.state.bookingValues.service}
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
              bookingValues={this.state.bookingValues}
              events={this.state.events || []}
              newEvent={this.state.newEvent}
              onChangeEvents={this.handleChangeEvents}
              onError={this.handleCalendarError}
              error={this.state.calendarError}
              unavailableDates={this.state.unavailableDates}
            />
            <div style={{ opacity: this.state.newEvent ? 1 : 0.3 }}>
              <br />
              {bookValues.duration &&
                bookValues.service && (
                  <b>
                    Total:{" $"}
                    {
                      serviceData[bookValues.service.value][
                        bookValues.duration.value
                      ]
                    }
                  </b>
                )}
              <br />
              To Reserve your spot, click the paypal button.
              <br />
              Visa & Mastercard both are accepted!
              <br />
              <br />
              <PayPalButton
                onPaymentComplete={this.handlePaymentComplete}
                price={
                  bookValues.duration && bookValues.service
                    ?
                        serviceData[bookValues.service.value][
                          bookValues.duration.value
                        ]


                    : undefined
                }
                desc={
                  bookValues.duration && bookValues.service
                    ? `${bookValues.service.label} - ${
                        bookValues.duration.label
                      }`
                    : undefined
                }
              />
            </div>
          </ModalContent>
        </ModalBg>
      </Overlay>
    );
  }
}
