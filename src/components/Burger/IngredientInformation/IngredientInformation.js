import React from "react";
import classes from "./IngredientInformation.module.css";

const IngredientInformation = (props) => (
  <div className={classes.IngredientWrapper}>
    <div className={classes.IngredientInformation}>
      <p>Price unit for this ingredient is..</p>
      <p>Your total extra charge is..</p>
    </div>
  </div>
);

export default IngredientInformation;
