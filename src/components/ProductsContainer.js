import React, { Component } from "react";
import { Grid, Loader, Dimmer, Icon, Button } from "semantic-ui-react";
import Product from "./Product";

class ProductsContainer extends Component {
  state = {
    products: [],
    currentIndex: 0,
  };

  componentDidMount() {
    console.log("[container.js]: In component did mount");

    // get api data from fake store https://fakestoreapi.com/products
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(json => {
        this.setState({
          products: json,
        });
      });

    //event listener for changing products with arrow keys
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = event => {
    if (event.keyCode === 39) this.nextProduct();
    if (event.keyCode === 37) this.prevProduct();
  };

  nextProduct = event => {
    if (this.state.currentIndex === this.state.products.length - 1) {
      this.setState({
        currentIndex: 0,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  };

  prevProduct = event => {
    if (this.state.currentIndex > 0)
      this.setState({
        currentIndex: this.state.currentIndex - 1,
      });
  };

  render() {
    const { products, currentIndex } = this.state;

    const styles = {
      grid: { alignItems: "center", gap: "20px" },
    };

    return (
      <Grid centered padded columns={3} style={styles.grid}>
        {products.length ? (
          <>
            <Button
              circular
              color='black'
              size='big'
              icon
              onClick={this.prevProduct}
            >
              <Icon name='arrow left' />
            </Button>
            <Product data={products[currentIndex]} next={this.nextProduct} />
            <Button
              circular
              color='black'
              size='big'
              icon
              onClick={this.nextProduct}
            >
              <Icon name='arrow right' />
            </Button>
          </>
        ) : (
          <Dimmer active>
            <Loader size='massive' indeterminate>
              Getting Products
            </Loader>
          </Dimmer>
        )}
      </Grid>
    );
  }
}

export default ProductsContainer;
