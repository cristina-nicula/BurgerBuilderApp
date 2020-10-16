import React from "react";
import classes from "./Sidedrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import PropTypes from "prop-types";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";

const Sidedrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closeSidedrawer} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.WrapperToggleBtn}>
          <ToggleButton
            openSidedrawer={props.open}
            clicked={props.closeSidedrawer}
          />
        </div>

        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

Sidedrawer.propTypes = {
  open: PropTypes.bool,
  closeSidedrawer: PropTypes.func,
};

export default Sidedrawer;
