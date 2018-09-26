import React, { Component } from "react";
import logo from "./dagen_all_trans_white.png";
import "./Favourite.css";
import Event from "../event/Event";
import MainMenu from "../main-menu/MainMenu";
import { findEventPeriods } from "../selectors/EventSelectors";

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteEventPeriods: []
    };
  }

  componentDidMount() {
    const favouriteEventPeriodsIds = JSON.parse(localStorage.getItem("favs"));

    if(favouriteEventPeriodsIds) {
      const favouriteEventPeriods = [];
      for(const id of favouriteEventPeriodsIds) {
        const foundEventPriod = findEventPeriods(this.props.store, id);
        if(foundEventPriod)
        favouriteEventPeriods.push(foundEventPriod);
      }
      this.setState({ favouriteEventPeriods: favouriteEventPeriods });
    }
  }

  render() {
    const { favouriteEventPeriods } = this.state;

    if(favouriteEventPeriods.length === 0) return (
      <div className="Event-list">
        <header className="Event-list-header">
          <img src={logo} className="Event-list-logo" alt="logo" />
          <h1 className="Event-list-title">FAVORITTER</h1>
          <MainMenu />
        </header>
        <div className="Event-list-wrapper">
          <h4>Du har ingen favoritter enda!</h4>
        </div>
      </div>
    );

    return (
      <div className="Event-list">
        <header className="Event-list-header">
          <img src={logo} className="Event-list-logo" alt="logo" />
          <h1 className="Event-list-title">FAVORITTER</h1>
          <MainMenu />
        </header>
        <div className="Event-list-wrapper">
          {favouriteEventPeriods.map((e, index) => (
            <Event key={index} eventPeriod={e} periodId={e.eventPeriodId} />
          ))}
        </div>
      </div>
    );
  }
}

export default Favourite;
