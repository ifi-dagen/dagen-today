import React, { Component } from "react";
import "./App.css";
import Routes from "./App-routes";
import mockdata from "./dagen-today-events.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPeriods: [],
      programPeriods: []
    };
  }

  componentDidMount() {
    if (window.location.hostname === "localehost") {
      this.setState({ eventPeriods: mockdata.eventPeriods });
    } else {

      let promises=[];

      promises.push(fetch(
        "https://ifi-dagen.github.io/static-program/dagen-today-events.json"
      )
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({ eventPeriods: data.eventPeriods });// TODO: fikse promis
        }));

        promises.push(fetch(
          "https://ifi-dagen.github.io/static-program/dagen-today-program.json"
        )
          .then(response => response.json())
          .then(data => {
            this.setState({ programPeriods: data.eventPeriods });
          }));
        
        Promise.resolve(promises);
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
