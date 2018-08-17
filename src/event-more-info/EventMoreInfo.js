import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./EventMoreInfo.css";
import { findEvent } from "../selectors/EventSelectors";

class EventMoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
  }

  componentDidMount() {
    const { eventPeriodId, eventId } = this.props.match.params;
    const event = findEvent(this.props.store, eventPeriodId, eventId);
    this.setState({ event: event });
  }

  render() {
    const { event } = this.state;
    return (
      <div className="event-more-info">
        <div className="event-more-info-fadein">
          <div className="event-more-info-wrapper">
            <div className="event-more-info-title">{event.eventTitle}</div>
            <div className="event-more-info-location">
              <i className="fas fa-map-marker-alt" /> {event.eventLocation}
            </div>
            <div className="event-more-info-start">
              <i className="far fa-clock clock" /> {event.eventStart}
            </div>
            <div className="event-more-info-description">
              {event.eventDescription}
            </div>
            <div className="event-more-info-holder">{event.eventHolder}</div>
          </div>
          <Link to={`/`} className="event-more-info-link">
            <div className="event-more-info-link-wrapper">
              <i className="fas fa-arrow-left" /> Tilbake
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default EventMoreInfo;
