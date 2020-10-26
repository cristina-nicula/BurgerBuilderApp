import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { NavLink } from "react-router-dom";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavLink to="/">
      <NavigationItem link="#">Burger Builder</NavigationItem>
    </NavLink>
    <NavLink to="/checkout">
      <NavigationItem>Checkout</NavigationItem>
    </NavLink>
  </ul>
);

export default NavigationItems;
