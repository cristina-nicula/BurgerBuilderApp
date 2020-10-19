import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";
import classes from "./OrderSummary.module.css";

class OrderSummary extends Component {
  componentDidUpdate() {}

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientType) => {
        return (
          <li key={ingredientType}>
            <span style={{ textTransform: "capitalize" }}>
              {ingredientType}
            </span>
            : {this.props.ingredients[ingredientType]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <div className={classes.OrderSummary}>
          <h3>Order summary</h3>
          <p>Your ingredient list is:</p>
          <ul className={classes.OrderSummaryList}>{ingredientSummary}</ul>
          <p>
            <span>Total price: {this.props.price.toFixed(2)} €</span>
          </p>
          <p>Continue to checkout?</p>
          <Button btnType={"Danger"} clicked={this.props.cancelPurchase}>
            CANCEL
          </Button>
          <Button btnType={"Success"} clicked={this.props.continuePurchase}>
            CONTINUE
          </Button>
        </div>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired,
};

export default OrderSummary;
