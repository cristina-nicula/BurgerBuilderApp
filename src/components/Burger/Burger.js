import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import PropTypes from "prop-types";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientType) => {
      return [...Array(props.ingredients[ingredientType])].map((_, i) => {
        console.log(ingredientType + i);
        console.log(Object.keys(props.ingredients));
        return (
          <BurgerIngredient
            activate={props.activateIngredient}
            active={props.activeIngredient}
            key={ingredientType + i}
            type={ingredientType}
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
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object,
};

export default Burger;
