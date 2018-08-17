import React, { Component } from "react";
import "./App.css";
import Routes from "./App-routes";
import mockdata from "./dagen-today-events.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPeriods: []
    };
  }

  componentDidMount() {
    if (window.location.hostname === "localhost") {
      this.setState({ eventPeriods: mockdata.eventPeriods });
    } else {
      fetch(
        "https://ifi-dagen.github.io/static-program/dagen-today-events.json"
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ eventPeriods: data.eventPeriods });
        });
    }
  }

  render() {
    return (
      <div>
        <Routes store={this.state} />
      </div>
    );
  }
}

export default App;

// https://us-central1-dagen-today-api.cloudfunctions.net/dagenEvents/
