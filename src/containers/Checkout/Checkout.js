import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
    extraCharge: 0,
    unitPrice: 0,
    ingredientQuantity: 4,
  };
  render() {
    return (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        totalExtraCharge={this.state.extraCharge}
        unitPrice={this.state.unitPrice}
        ingredientQuantity={this.state.ingredientQuantity}
      />
    );
  }
}
export default Checkout;
