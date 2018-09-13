import React, { Component } from "react";
import "./EventInfo.css";
import { Link } from "react-router-dom";

/*export const EventInfo = props => {
  const { event, periodId } = props;
  if (!props.isVisible) return null;
  else
    return (
      <Link
        to={`/info/${periodId}/event/${event.eventId}`}
        className="event-info-link"
      >
        <div className="event-info">
          <div className="event-info-icon">
            <i className={event.eventIcon} />
          </div>
          <div className="event-info-inner-wrapper">
            <div className="event-info-title">
              {event.eventType === "" ? "" : `${event.eventType}: `}
              {event.eventStart} {event.eventTitle} 
            </div>
            <div className="event-info-eventHolder">{event.eventHolder}</div>
            <div className="event-info-eventLocation">
              Hvor? {event.eventLocation} 
            </div>
          </div>
          <div className="evnet-info-fav"><i className="far fa-star fa-2x"></i></div>
        </div>
      </Link>
    );
};*/

class EventInfo extends Component {
  constructor(props) {
    super(props);
  }

  /*setFavourite() {// TODO: Fikse denne slik at favourites kan legges til
    const { event, periodId } = this.props;
    console.log('event: ', event, ' periodid: ', periodId);
  }*/

  render() {
    const { event, periodId } = this.props;
    if (!this.props.isVisible) return null;
    else
    return (
        <div className="event-info">
          <div className="event-info-icon">
            <i className={event.eventIcon} />
          </div>
          <Link to={`/info/${periodId}/event/${event.eventId}`} className="event-info-link">
          <div className="event-info-inner-wrapper">
            <div className="event-info-title">
              {event.eventType === "" ? "" : `${event.eventType}: `}
              {event.eventStart} {event.eventTitle} 
            </div>
            <div className="event-info-eventHolder">{event.eventHolder}</div>
            <div className="event-info-eventLocation">
              Hvor? {event.eventLocation} 
            </div>
          </div>
          </Link>
          <div className="evnet-info-fav"><i className="far fa-star fa-2x"></i></div>
        </div>
      
    );
  }
}

export default EventInfo;
