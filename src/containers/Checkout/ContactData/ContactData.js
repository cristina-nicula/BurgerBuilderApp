import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    address: {
      streetName: "",
      streetNumber: "",
      zipcode: "",
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
      customer: {
        name: "Cristina",
        address: "testaddress",
        phone: 4911441141415,
        email: "test@test.com",
      },
      delivery: "fast",
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

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="phone"
          placeholder="Your phone number"
        />
        <input
          className={classes.Input}
          type="text"
          name="streetName"
          placeholder="Street Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="streetNumber"
          placeholder="Street Number"
        />
        <input
          className={classes.Input}
          type="text"
          name="zipcode"
          placeholder="Postal Code"
        />
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
