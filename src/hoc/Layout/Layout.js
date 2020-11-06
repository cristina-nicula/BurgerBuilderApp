import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };
  closeSidedrawerHandler = () => {
    this.setState({
      showSidedrawer: false,
    });
  };

  openSidedrawerHandler = () => {
    this.setState((prevState) => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openSidedrawer={this.openSidedrawerHandler}
        />
        <Sidedrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSidedrawer}
          closeSidedrawer={this.closeSidedrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
