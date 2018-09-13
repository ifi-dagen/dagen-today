import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="main-menu">
          <Link to={`/`} className="">
            <div className="menu-item-event">Program</div>
          </Link>
          <Link to={`/program`} className="">
            <div className="menu-item-prog">Foredrag</div>
          </Link>
          <Link to={`/favoritter`} className="">
            <div className="menu-item-fav">Favoritter</div>
          </Link>
      </div>
    );
  }
}

export default MainMenu;
