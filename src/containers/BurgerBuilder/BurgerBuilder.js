import React, { Component } from "react";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Aux from "../../hoc/Aux/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    unitPrice: 0,
    totalExtraCharge: 0,
    purchaseMode: false,
    ingredientActive: "",
    ingredientQuantity: 0,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updateActiveIngredient = (event) => {
    if (event.currentTarget.dataset.div_id === this.state.ingredientActive) {
      this.setState({
        ingredientActive: "",
      });
      return;
    }
    const updatedCount = this.props.ings[event.currentTarget.dataset.div_id];
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
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchaseMode: true,
      });
    } else {
      this.props.history.push("/auth");
      this.props.onSetAuthRedirectPath("/checkout");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchaseMode: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {};
    for (let key in this.props.ings) {
      disabledInfo[key] = this.props.ings[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger
            activateIngredient={this.updateActiveIngredient}
            activeIngredient={this.state.ingredientActive}
            ingredients={this.props.ings}
            extraCharge={this.state.totalExtraCharge}
            unitPrice={this.state.unitPrice}
            ingredientQuantity={this.state.ingredientQuantity}
          />

          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientDeleted={this.props.onDeleteIngredient}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchaseMode}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onDeleteIngredient: (ingName) =>
      dispatch(actions.deleteIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
