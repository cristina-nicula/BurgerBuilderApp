import React from "react";
import classes from "./NavigationItem.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active} exact>
      {props.children}
    </NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string,
  active: PropTypes.bool,
};

export default NavigationItem;
