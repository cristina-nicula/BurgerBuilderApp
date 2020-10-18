import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import IngredientInformation from "./IngredientInformation/IngredientInformation";
import PropTypes from "prop-types";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientType) => {
      return [...Array(props.ingredients[ingredientType])].map((_, i) => {
        return (
          <BurgerIngredient
            activateIngredient={props.activateIngredient}
            activeIngredient={props.activeIngredient}
            key={ingredientType + i}
            type={ingredientType}
            totalExtraCharge={props.extraCharge}
            unitPrice={props.unitPrice}
            ingredientQuantity={props.ingredientQuantity}
          />
        );
      });
    })
    .reduce((accummulator, currentValue) => {
      return accummulator.concat(currentValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  let ingredientInformation = () => {
    if (props.active === props.type) {
      return (
        <IngredientInformation
          activate={props.activateIngredient}
          ingredientActive={props.activeIngredient}
          totalExtraCharge={props.extraCharge}
          unitPrice={props.unitPrice}
          ingredientQuantity={props.ingredientQuantity}
        />
      );
    }
  };

  return (
    <div className={classes.BurgerWrapper}>
      <div className={classes.Burger}>
        <BurgerIngredient
          type={"bread-top"}
          activeIngredient={props.activeIngredient}
        />
        {transformedIngredients}

        <BurgerIngredient
          type={"bread-bottom"}
          activeIngredient={props.activeIngredient}
        />
      </div>
      {ingredientInformation()}
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
  activeIngredient: PropTypes.string.isRequired,
};

export default Burger;
