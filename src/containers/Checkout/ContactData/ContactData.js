import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street name and number",
        },
        value: "",
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Your phone number",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fast", displayValue: "Fast delivery" },
            { value: "standard", displayValue: "Standard delivery" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };
    console.log(orders);
    axios
      .post("/orders.json", orders)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  changeFormHandler = (event, inputIdentifier) => {
    const orderFormCopy = { ...this.state.orderForm };
    const formElementCopy = { ...orderFormCopy[inputIdentifier] };
    formElementCopy.value = event.target.value;
    orderFormCopy[inputIdentifier] = formElementCopy;
    this.setState({ orderForm: orderFormCopy });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementsArray.map((elementForm) => {
          return (
            <Input
              changeForm={(event) =>
                this.changeFormHandler(event, elementForm.id)
              }
              key={elementForm.id}
              elementType={elementForm.setup.elementType}
              elementConfig={elementForm.setup.elementConfig}
              value={elementForm.setup.value}
            />
          );
        })}
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
