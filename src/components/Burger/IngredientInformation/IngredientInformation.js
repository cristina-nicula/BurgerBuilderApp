import React from "react";
import classes from "./IngredientInformation.module.css";

const IngredientInformation = (props) => (
  <div className={classes.IngredientWrapper}>
    <div className={classes.IngredientInformation}>
      <p>Price unit for this ingredient is {props.unit} €</p>
      <p>Your total extra charge is {props.totalExtraCharge.toFixed(2)} €</p>
    </div>
  </div>
);

export default IngredientInformation;
