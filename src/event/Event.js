import React, { Component } from "react";
import "./Event.css";
import EventInfo from "./event-info/EventInfo";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEventPeriods: []
    };
  }

  componentDidMount() {
    const { menuType } = this.props;
    const openEventPeriods = JSON.parse(localStorage.getItem("pnevtprds" + menuType));
    if (openEventPeriods) this.setState({ openEventPeriods: openEventPeriods });
  }

  displayEventInfo() {
    const { eventPeriod, menuType } = this.props;

    let openEventPeriods = JSON.parse(localStorage.getItem("pnevtprds" + menuType));
    if (openEventPeriods) {
      if (openEventPeriods.find(pId => pId === eventPeriod.eventPeriodId)) {
        openEventPeriods = openEventPeriods.filter(
          pId => pId !== eventPeriod.eventPeriodId
        );
        this.setState({ openEventPeriods: openEventPeriods });
        localStorage.setItem("pnevtprds" + menuType, JSON.stringify(openEventPeriods));
      } else {
        openEventPeriods.push(eventPeriod.eventPeriodId);
        this.setState({ openEventPeriods: openEventPeriods });
        localStorage.setItem("pnevtprds" + menuType, JSON.stringify(openEventPeriods));
      }
    } else {
      this.setState({ openEventPeriods: [eventPeriod.eventPeriodId] });
      localStorage.setItem(
        "pnevtprds" + menuType,
        JSON.stringify([eventPeriod.eventPeriodId])
      );
    }
  }

  render() {
    const { eventPeriod, periodId, handleFavourites } = this.props;
    const canShowEvent =
      this.state.openEventPeriods.find(
        pId => pId === eventPeriod.eventPeriodId
      ) &&
      eventPeriod.eventPeriodCanExpand &&
      eventPeriod.events.length > 0;
    return (
      <div className="event-wrapper">
        <div className="event-inner-wrapper">
          <div className="event" onClick={this.displayEventInfo.bind(this)}>
            <div className="event-clock">
              <i className="far fa-clock clock" />
            </div>
            <div className="event-title">
              {eventPeriod.eventPeriodHeaderText}
            </div>
            <div className="event-angle">
              <i
                className={
                  eventPeriod.eventPeriodCanExpand
                    ? canShowEvent
                      ? "fas fa-angle-up"
                      : "fas fa-angle-down"
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="event-info-wrapper">
          {eventPeriod.events.map((e, index) => (
            <EventInfo
              isVisible={canShowEvent}
              key={index}
              event={e}
              period={e.eventPeriod}
              periodId={periodId}
              onSelectFavourite={handleFavourites}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Event;
