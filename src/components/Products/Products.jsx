import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

// const products = [
//   {
//     id: 1,
//     name: "shoes",
//     description: "Running Shoes",
//     price: "KSH 500",
//     image:
//       "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     name: "Macbook",
//     description: "Apple Macbook",
//     price: "KSH 1000",
//     image:
//       "https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//   },
// ];

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => {
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Products;
