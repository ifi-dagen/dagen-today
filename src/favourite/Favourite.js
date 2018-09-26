import React, { Component } from "react";
import logo from "./dagen_all_trans_white.png";
import "./Favourite.css";
import Event from "../event/Event";
import MainMenu from "../main-menu/MainMenu";
import { findEventPeriod } from "../selectors/EventSelectors";

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
        const foundEventPriod = findEventPeriod(this.props.store, id);
        if(foundEventPriod)
        favouriteEventPeriods.push(foundEventPriod);
      }
      this.setState({ favouriteEventPeriods: favouriteEventPeriods });
    }
  }

  handleFavourites = (favoriteOption) => {
    if(favoriteOption.isFavourite) {
      const foundEventPriod = findEventPeriod(this.props.store, favoriteOption.periodId);
      this.setState(prevState => ({
        favouriteEventPeriods: [...prevState.favouriteEventPeriods, foundEventPriod]
      }));
    } else {
      let filteredfavouriteEventPeriods = this.state.favouriteEventPeriods.filter(period => period.eventPeriodId !== favoriteOption.periodId)
      this.setState({favouriteEventPeriods: filteredfavouriteEventPeriods});
    }
  }

  sortFavouriteEventPriods = (favouriteEventPeriods) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const objToSort = favouriteEventPeriods;
    for(const period of objToSort) {
      const timeStrings = period.eventPeriodHeaderText.split(':');
      const reserv = new Date(year,month,day,timeStrings[0],timeStrings[1]);
      period.fullDateTime = reserv;
    }
    const sorted = objToSort.sort((a,b) => (a.fullDateTime > b.fullDateTime) ? 1 : ((b.fullDateTime > a.fullDateTime) ? -1 : 0));
    return sorted;
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

    const sortedFavs = this.sortFavouriteEventPriods(favouriteEventPeriods);

    return (
      <div className="Event-list">
        <header className="Event-list-header">
          <img src={logo} className="Event-list-logo" alt="logo" />
          <h1 className="Event-list-title">FAVORITTER</h1>
          <MainMenu />
        </header>
        <div className="Event-list-wrapper">
          {sortedFavs.map((e, index) => (
            <Event key={index} eventPeriod={e} periodId={e.eventPeriodId} handleFavourites={this.handleFavourites} />
          ))}
        </div>
      </div>
    );
  }
}

export default Favourite;
