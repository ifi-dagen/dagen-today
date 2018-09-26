import React, { Component } from "react";
import "./Event.css";
import EventInfo from "./event-info/EventInfo";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEventPeriods: [],
      favouriteEventIds: [],
    };
  }

  componentDidMount() {
    const openEventPeriods = JSON.parse(localStorage.getItem("pnevtprds"));
    if (openEventPeriods) this.setState({ openEventPeriods: openEventPeriods });
  }

  displayEventInfo() {
    const { eventPeriod } = this.props;

    let openEventPeriods = JSON.parse(localStorage.getItem("pnevtprds"));
    if (openEventPeriods) {
      if (openEventPeriods.find(pId => pId === eventPeriod.eventPeriodId)) {
        openEventPeriods = openEventPeriods.filter(
          pId => pId !== eventPeriod.eventPeriodId
        );
        this.setState({ openEventPeriods: openEventPeriods });
        localStorage.setItem("pnevtprds", JSON.stringify(openEventPeriods));
      } else {
        openEventPeriods.push(eventPeriod.eventPeriodId);
        this.setState({ openEventPeriods: openEventPeriods });
        localStorage.setItem("pnevtprds", JSON.stringify(openEventPeriods));
      }
    } else {
      this.setState({ openEventPeriods: [eventPeriod.eventPeriodId] });
      localStorage.setItem(
        "pnevtprds",
        JSON.stringify([eventPeriod.eventPeriodId])
      );
    }
  }

  handleFavourites = (favoriteOption) => {
    if(favoriteOption.isFavourite) {
      this.setState(prevState => ({
        favouriteEventIds: [...prevState.favouriteEventIds, favoriteOption.periodId]
      }));
    } else {
      let filteredFavouriteEventIds = this.state.favouriteEventIds.filter(id => id !== favoriteOption.periodId)
      this.setState({favouriteEventIds: filteredFavouriteEventIds});
    }
  }

  render() {
    const { eventPeriod, periodId } = this.props;
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
              onSelectFavourite={this.handleFavourites.bind(this)}
              refresh={this.handleFavourites}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Event;
