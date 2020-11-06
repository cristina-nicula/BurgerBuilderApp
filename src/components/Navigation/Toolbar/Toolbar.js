import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import PropTypes from "prop-types";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToggleButton clicked={props.openSidedrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAutheticated={props.isAuth} />
    </nav>
  </header>
);

Toolbar.propType = {
  openSidedrawer: PropTypes.func,
};

export default Toolbar;
