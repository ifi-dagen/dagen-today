import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import EventList from "./event-list/EventList";
import EventMoreInfo from "./event-more-info/EventMoreInfo";
import { Loader } from "./components/loader/Loader";
import ProgramList from "./program-list/ProgramList";
import Favourite from "./favourite/Favourite";

class Routes extends Component {
  render() {
    if (this.props.store.eventPeriods.length === 0) return <Loader />;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={prop => <EventList {...prop} store={this.props.store} />}
        />
        <Route
          path="/info/:eventPeriodId/event/:eventId"
          render={prop => <EventMoreInfo {...prop} store={this.props.store} />}
        />
        <Route
          exact
          path="/program"
          render={prop => <ProgramList {...prop} store={this.props.store} />}
        />
        <Route
          exact
          path="/favoritter"
          render={prop => <Favourite {...prop} store={this.props.store} />}
        />
        <Route render={prop => <EventList {...prop} store={this.props.store} />} />
      </Switch>
    );
  }
}

export default Routes;
