import React, { Component } from "react";
import "./EventInfo.css";

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavouritePeriod: false
    }
  }

  componentDidMount() {
    const { periodId } = this.props;

    let favouriteEventPeriods = JSON.parse(localStorage.getItem("favs"));
    if (favouriteEventPeriods) { 
      if (favouriteEventPeriods.find(pId => pId === periodId)) {
        this.setState({ isFavouritePeriod: true });
      }
    }
  }

  setFavourite() {
    const { periodId } = this.props;

    let favouriteEventPeriods = JSON.parse(localStorage.getItem("favs"));
    if (favouriteEventPeriods) {
      if (favouriteEventPeriods.find(pId => pId === periodId)) {
        favouriteEventPeriods = favouriteEventPeriods.filter(
          pId => pId !== periodId
        );
        this.setState({ isFavouritePeriod: false });
        if(this.props.onSelectFavourite)
        this.props.onSelectFavourite({isFavourite: false, periodId: periodId}); 
        localStorage.setItem("favs", JSON.stringify(favouriteEventPeriods));
      } else {
        favouriteEventPeriods.push(periodId);
        this.setState({ isFavouritePeriod: true });
        if(this.props.onSelectFavourite)
        this.props.onSelectFavourite({isFavourite: true, periodId: periodId}); 
        localStorage.setItem("favs", JSON.stringify(favouriteEventPeriods));
      }
    } else {
      this.setState({ isFavouritePeriod: true });
      if(this.props.onSelectFavourite)
      this.props.onSelectFavourite({isFavourite: true, periodId: periodId}); 
      localStorage.setItem(
        "favs",
        JSON.stringify([periodId])
      );
    }
  }

  isFavourite = (periodId) => {
    let favouriteEventPeriods = JSON.parse(localStorage.getItem("favs"));
    if (favouriteEventPeriods) { 
      if (favouriteEventPeriods.find(pId => pId === periodId)) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { event, periodId } = this.props;

    if (!this.props.isVisible) return null;
    else
    return (
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
            <div className="event-info-desc">{event.eventDescription}</div>
            <div className="event-info-eventLocation">
            <i className="fas fa-map-marker-alt"></i> {event.eventLocation} 
            </div>
          </div>
          <div className="evnet-info-fav"> {this.isFavourite(periodId) ? <i className="fas fa-star fa-2x" onClick={this.setFavourite.bind(this)}></i> : <i className="far fa-star fa-2x" onClick={this.setFavourite.bind(this)}></i> }</div>
        </div>
      
    );
  }
}

export default EventInfo;
