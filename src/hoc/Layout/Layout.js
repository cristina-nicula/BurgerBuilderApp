import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";

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
        <Toolbar openSidedrawer={this.openSidedrawerHandler} />
        <Sidedrawer
          open={this.state.showSidedrawer}
          closeSidedrawer={this.closeSidedrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
