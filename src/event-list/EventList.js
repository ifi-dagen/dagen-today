import React, { Component } from "react";
import logo from "./dagen_all_trans_white.png";
import "./EventList.css";
import Event from "../event/Event";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPeriods: []
    };
  }

  componentDidMount() {
    this.setState({ eventPeriods: this.props.store.eventPeriods });
  }

  render() {
    const { eventPeriods } = this.state;

    return (
      <div className="Event-list">
        <header className="Event-list-header">
          <img src={logo} className="Event-list-logo" alt="logo" />
          <h1 className="Event-list-title">PROGRAM FOR 2018</h1>
        </header>
        <div className="Event-list-wrapper">
          {eventPeriods.map((e, index) => (
            <Event key={index} eventPeriod={e} periodId={e.eventPeriodId} />
          ))}
        </div>
      </div>
    );
  }
}

export default EventList;
