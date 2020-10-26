import React from "react";
import classes from "./IngredientInformation.module.css";
import PropTypes from "prop-types";

const IngredientInformation = (props) => {
  return (
    <div
      className={[
        classes.IngredientWrapper,
        props.ingredientActive ? classes.Show : "",
      ].join(" ")}
    >
      <div className={classes.IngredientInformation}>
        <p>
          Price for {props.ingredientActive} is {props.unitPrice} €/unit.
        </p>
        <p>
          Your total extra charge for {props.ingredientQuantity} x{" "}
          {props.ingredientActive} is {props.totalExtraCharge.toFixed(2)} €
        </p>
      </div>
    </div>
  );
};

IngredientInformation.propTypes = {
  ingredientActive: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  ingredientQuantity: PropTypes.number.isRequired,
  totalExtraCharge: PropTypes.number.isRequired,
};

export default IngredientInformation;
