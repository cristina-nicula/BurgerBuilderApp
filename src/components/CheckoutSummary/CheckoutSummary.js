import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.BurgerWrapper}>
        <Burger
          ingredients={props.ingredients}
          activateIngredient={() => {}}
          activeIngredient={""}
          extraCharge={0}
          unitPrice={0}
          ingredientQuantity={0}
        />
      </div>
      <Button btnType="Danger" clicked={() => {}}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={() => {}}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
