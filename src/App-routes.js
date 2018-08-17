import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import EventList from "./event-list/EventList";
import EventMoreInfo from "./event-more-info/EventMoreInfo";
import { Loader } from "./components/loader/Loader";

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
      </Switch>
    );
  }
}

export default Routes;
