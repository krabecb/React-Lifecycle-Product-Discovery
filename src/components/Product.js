import React, { Component } from "react";
import { Card, Image, Progress } from "semantic-ui-react";

const INITIAL_STATE = {
  seconds: 40,
};

class Product extends Component {
  state = {
    timer: null,
    seconds: INITIAL_STATE.seconds,
  };

  componentDidMount() {
    this.setState({
      timer: setInterval(this.decreaseTime, 1000),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.id !== this.props.data.id) {
      this.setState({
        seconds: INITIAL_STATE.seconds,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  decreaseTime = () => {
    if (this.state.seconds === 1) {
      this.props.next();
    }
    this.setState(prevState => {
      return {
        seconds: prevState.seconds - 1,
      };
    });
  };

  render() {
    const { image, title, category, description } = this.props.data;
    return (
      <Card style={{ minWidth: "400px" }}>
        <Image src={image} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{category}</Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Progress color='pink' percent={5 * this.state.seconds}></Progress>
        </Card.Content>
      </Card>
    );
  }
}

export default Product;
