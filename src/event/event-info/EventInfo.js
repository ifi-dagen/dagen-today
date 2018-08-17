import React from "react";
import "./EventInfo.css";
import { Link } from "react-router-dom";

export const EventInfo = props => {
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
              {event.eventTitle}
            </div>
            <div className="event-info-eventHolder">{event.eventHolder}</div>
            <div className="event-info-eventLocation">
              Hvor? {event.eventLocation}
            </div>
          </div>
        </div>
      </Link>
    );
};
