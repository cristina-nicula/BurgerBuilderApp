import React from "react";
import classes from "./ToggleButton.module.css";
import PropTypes from "prop-types";

const ToggleButton = (props) => (
  <div className={classes.ToggleButton} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

ToggleButton.propTypes = {
  clicked: PropTypes.func,
};
export default ToggleButton;
