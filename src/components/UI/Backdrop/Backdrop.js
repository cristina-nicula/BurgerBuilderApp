import React from "react";
import classes from "./Backdrop.module.css";
import PropTypes from "prop-types";

const Backdrop = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool,
};
export default Backdrop;
