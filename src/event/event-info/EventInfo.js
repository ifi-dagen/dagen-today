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
    this.state = {
      isFavouritePeriod: false
    }
  }

  componentDidMount() {
    const { event, periodId } = this.props;

    let favouriteEventPeriods = JSON.parse(localStorage.getItem("favs"));
    if (favouriteEventPeriods) { 
      if (favouriteEventPeriods.find(pId => pId === periodId)) {
        this.setState({ isFavouritePeriod: true });
      }
    }
  }

  setFavourite() {// TODO: Fikse denne slik at favourites kan legges til
    const { event, periodId } = this.props;

    let favouriteEventPeriods = JSON.parse(localStorage.getItem("favs"));
    if (favouriteEventPeriods) {
      if (favouriteEventPeriods.find(pId => pId === periodId)) {
        favouriteEventPeriods = favouriteEventPeriods.filter(
          pId => pId !== periodId
        );
        this.setState({ isFavouritePeriod: false });
        this.props.onSelectFavourite({isFavourite: false, periodId: periodId}); 
        localStorage.setItem("favs", JSON.stringify(favouriteEventPeriods));
      } else {
        favouriteEventPeriods.push(periodId);
        this.setState({ isFavouritePeriod: true });
        this.props.onSelectFavourite({isFavourite: true, periodId: periodId}); 
        localStorage.setItem("favs", JSON.stringify(favouriteEventPeriods));
      }
    } else {
      this.setState({ isFavouritePeriod: true });
      this.props.onSelectFavourite({isFavourite: true, periodId: periodId}); 
      localStorage.setItem(
        "favs",
        JSON.stringify([periodId])
      );
    }
  }

  /*componentWillReceiveProps(props) {
    console.log('props: ', props);
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
          <div className="evnet-info-fav" onClick={this.setFavourite.bind(this)}> {this.state.isFavouritePeriod ? <i className="fas fa-star fa-2x"></i> : <i className="far fa-star fa-2x"></i> }</div>
        </div>
      
    );
  }
}

export default EventInfo;
