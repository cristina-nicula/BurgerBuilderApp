import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredient.module.css";

class BurgerIngredient extends Component {
  render() {
    let ingredient = "";

    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredient = (
          <div
            data-div_id={"meat"}
            onClick={this.props.activateIngredient}
            className={[
              classes.Meat,
              this.props.type === this.props.activeIngredient
                ? classes.Active
                : null,
            ].join(" ")}
          />
        );

        break;
      case "salad":
        ingredient = (
          <div
            data-div_id={"salad"}
            onClick={this.props.activateIngredient}
            className={[
              classes.Salad,
              this.props.type === this.props.activeIngredient
                ? classes.Active
                : null,
            ].join(" ")}
          />
        );
        break;
      case "bacon":
        ingredient = (
          <div
            data-div_id={"bacon"}
            onClick={this.props.activateIngredient}
            className={[
              classes.Bacon,
              this.props.type === this.props.activeIngredient
                ? classes.Active
                : null,
            ].join(" ")}
          />
        );
        break;
      case "cheese":
        ingredient = (
          <div
            data-div_id={"cheese"}
            onClick={this.props.activateIngredient}
            className={[
              classes.Cheese,
              this.props.type === this.props.activeIngredient
                ? classes.Active
                : null,
            ].join(" ")}
          />
        );
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
  activeIngredient: PropTypes.string.isRequired,
  activateIngredient: PropTypes.func,
};

export default BurgerIngredient;
