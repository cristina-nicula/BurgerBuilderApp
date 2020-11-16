import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
      };
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: false });
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmerdHandler = () => {
      this.setState({
        error: false,
      });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmerdHandler}
          >
            {this.state.error ? this.state.error.message : false}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
