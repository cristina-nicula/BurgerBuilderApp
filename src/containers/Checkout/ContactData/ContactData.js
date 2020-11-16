import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your full name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        modified: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street name and number",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        modified: false,
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Your phone number",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 20,
        },
        valid: false,
        modified: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        modified: false,
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fast", displayValue: "Fast delivery" },
            { value: "standard", displayValue: "Standard delivery" },
          ],
        },
        value: "fast",
        validation: {},
        valid: true,
        modified: false,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const orders = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(orders, this.props.token);
  };

  changeFormHandler = (event, inputIdentifier) => {
    const formElementCopy = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        modified: true,
      }
    );
    const orderFormCopy = updateObject(this.state.orderForm, {
      [inputIdentifier]: formElementCopy,
    });

    let formIsValid = true;
    for (let inputIdentifier in orderFormCopy) {
      formIsValid = orderFormCopy[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: orderFormCopy, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((elementForm) => {
          return (
            <Input
              changed={(event) => this.changeFormHandler(event, elementForm.id)}
              key={elementForm.id}
              elementType={elementForm.setup.elementType}
              elementConfig={elementForm.setup.elementConfig}
              value={elementForm.setup.value}
              invalid={!elementForm.setup.valid}
              modified={elementForm.setup.modified}
            />
          );
        })}
        <Button
          clicked={() => {}}
          disabled={!this.state.formIsValid}
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please enter your Contact Data:</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
