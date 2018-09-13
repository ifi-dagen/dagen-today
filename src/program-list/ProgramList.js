import React, { Component } from "react";
import logo from "./dagen_all_trans_white.png";
import "./ProgramList.css";
import Event from "../event/Event";
import MainMenu from "../main-menu/MainMenu";

class ProgramList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPeriods: []
    };
  }

  componentDidMount() {
    this.setState({ eventPeriods: this.props.store.programPeriods });
  }

  render() {
    const { eventPeriods } = this.state;

    return (
      <div className="Event-list">
        <header className="Event-list-header">
          <img src={logo} className="Event-list-logo" alt="logo" />
          <h1 className="Event-list-title">FOREDRAG FOR 2018</h1>
          <MainMenu />
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

export default ProgramList;
