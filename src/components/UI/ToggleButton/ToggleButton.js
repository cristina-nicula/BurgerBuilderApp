import React from "react";
import classes from "./ToggleButton.module.css";
import PropTypes from "prop-types";

const ToggleButton = (props) => {
  let classToAdd = [classes.ToggleButton];
  if (props.openSidedrawer) {
    classToAdd = [classes.ToggleButton, classes.Open];
  }
  return (
    <div
      open={props.openSidedrawer}
      className={classToAdd.join(" ")}
      onClick={props.clicked}
    >
      <div className={classes.Line}></div>
    </div>
  );
};

ToggleButton.propTypes = {
  clicked: PropTypes.func,
};
export default ToggleButton;
