import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import PropTypes from "prop-types";

const controls = [
  { ingredientLabel: "Cheese", type: "cheese" },
  { ingredientLabel: "Bacon", type: "bacon" },
  { ingredientLabel: "Salad", type: "salad" },
  { ingredientLabel: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  console.log(props);
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)} €</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.ingredientLabel}
            ingredientLabel={control.ingredientLabel}
            addIngredient={() => props.ingredientAdded(control.type)}
            deleteIngredient={() => props.ingredientDeleted(control.type)}
            disabled={props.disabled[control.type]}
          />
        );
      })}
      <button
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func,
  ingredientDeleted: PropTypes.func,
  disabled: PropTypes.object,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool,
  ingredients: PropTypes.string,
};

export default BuildControls;
