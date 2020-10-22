import React, { Component } from "react";
import axios from "../../axios-orders";

import Aux from "../../hoc/Aux/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    unitPrice: 0,
    totalExtraCharge: 0,
    totalPrice: 4,
    purchasable: false,
    purchaseMode: false,
    ingredientActive: "",
    ingredientQuantity: 0,
  };

  updateActiveIngredient = (event) => {
    if (event.currentTarget.dataset.div_id === this.state.ingredientActive) {
      this.setState({
        ingredientActive: "",
      });
      return;
    }
    const updatedCount = this.state.ingredients[
      event.currentTarget.dataset.div_id
    ];
    const additionPrice = INGREDIENT_PRICES[event.currentTarget.dataset.div_id];
    const newExtraCharge = additionPrice * updatedCount;
    this.setState({
      ingredientActive: event.currentTarget.dataset.div_id,
      unitPrice: additionPrice,
      totalExtraCharge: newExtraCharge,
      ingredientQuantity: updatedCount,
    });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientType) => {
        return ingredients[ingredientType];
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const additionPrice = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + additionPrice;
    const newExtraCharge = additionPrice * updatedCount;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      unitPrice: additionPrice,
      totalExtraCharge: newExtraCharge,
      ingredientQuantity: updatedCount,
      ingredientActive: type,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  deleteIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const initialPrice = this.state.totalPrice;
    const deductionPrice = INGREDIENT_PRICES[type];
    const newPrice = initialPrice - deductionPrice;
    const newExtraCharge = deductionPrice * updatedCount;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      unitPrice: deductionPrice,
      totalExtraCharge: newExtraCharge,
      ingredientQuantity: updatedCount,
      ingredientActive: type,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchaseMode: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchaseMode: false,
    });
  };

  purchaseContinueHandler = () => {
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Cristina",
        address: "testaddress",
        phone: 4911441141415,
        email: "test@test.com",
      },
      delivery: "fast",
    };
    axios
      .post("/orders.json", orders)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const disabledInfo = {};
    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchaseMode}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
          />
        </Modal>

        <Burger
          activateIngredient={this.updateActiveIngredient}
          activeIngredient={this.state.ingredientActive}
          ingredients={this.state.ingredients}
          extraCharge={this.state.totalExtraCharge}
          unitPrice={this.state.unitPrice}
          ingredientQuantity={this.state.ingredientQuantity}
        />

        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientDeleted={this.deleteIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
