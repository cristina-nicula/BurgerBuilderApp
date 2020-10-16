import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummay] rendered");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientKey) => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Order summary</h3>
        <p>Your ingredient list is:</p>
        <ul>{ingredientSummary}</ul>
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
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  cancelPurchase: PropTypes.func,
  continuePurchase: PropTypes.func,
};

export default OrderSummary;
