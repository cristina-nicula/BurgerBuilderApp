import React from "react";
import classes from "./BuildControl.module.css";
import PropTypes from "prop-types";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.ingredientLabel}</div>
      <button
        className={classes.Less}
        onClick={props.deleteIngredient}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={classes.More}
        onClick={props.addIngredient}
        // onClick={props.updateExtraCharge}
      >
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  ingredientLabel: PropTypes.string,
  deleteIngredient: PropTypes.func,
  disabled: PropTypes.bool,
  addIngredient: PropTypes.func,
};

export default BuildControl;
