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
import * as actionTypes from "../../store/actions";

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
    loading: false,
    error: false,
  };

  // componentDidMount() {
  //   axios
  //     .get("https://burger-builder-app-12965.firebaseio.com/ingredients.json")
  //     .then((response) => {
  //       this.setState({
  //         ingredients: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         error: true,
  //       });
  //     });
  // }

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

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ings,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const additionPrice = INGREDIENT_PRICES[type];
  //   const newPrice = this.props.price + additionPrice;
  //   const newExtraCharge = additionPrice * updatedCount;
  //
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //     unitPrice: additionPrice,
  //     totalExtraCharge: newExtraCharge,
  //     ingredientQuantity: updatedCount,
  //     ingredientActive: type,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  //
  // deleteIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.ings,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const initialPrice = this.props.price;
  //   const deductionPrice = INGREDIENT_PRICES[type];
  //   const newPrice = initialPrice - deductionPrice;
  //   const newExtraCharge = deductionPrice * updatedCount;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //     unitPrice: deductionPrice,
  //     totalExtraCharge: newExtraCharge,
  //     ingredientQuantity: updatedCount,
  //     ingredientActive: type,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

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
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {};
    for (let key in this.props.ings) {
      disabledInfo[key] = this.props.ings[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onDeleteIngredient: (ingName) =>
      dispatch({
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
