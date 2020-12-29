import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
// The number of columns change by resizing the window

class MyWrapper extends React.Component {
  render() {
    return (
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {this.props.products ? (
            this.props.products.map((product) => {
              return (
                <Card style={{ margin: "10px" }}>
                  {console.log(product.media.source)}
                  <img
                    src={product.media.source}
                    title={product.name}
                    style={{ width: "100%" }}
                  />
                  <CardContent>
                    <div>
                      <Typography variant="body2" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2">
                        {product.price.formatted_with_code}
                      </Typography>
                    </div>

                    {/* <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant="body2"
                    color="textSecondary"
                  /> */}
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="Add to Cart"
                      onClick={() => this.props.onAddToCart(product.id, 1)}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div>
              <Typography variant="h5" gutterBottom>
                Loading...
              </Typography>
            </div>
          )}
        </Masonry>
      </ResponsiveMasonry>
    );
  }
}

export default MyWrapper;
