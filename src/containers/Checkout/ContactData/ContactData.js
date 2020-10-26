import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

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
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Please enter your Contact Data:</h4>
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
          <Button clicked={() => {}} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
