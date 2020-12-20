import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(
  "pk_test_51HygAGJorkHEA4pQgwoLPjtAEepgD1n2gKaeQogM3cFTSQCuOQ9ER7NjrBsCUu4k3y99NFUdHzECLGiustBMrCdq00OGXgiS5k"
);

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const fakeData = {
        line_items: {
          // Key is the line item ID for our test product
          item_GNqKE50NwdgBLV: {
            quantity: 1,
          },
        },
        customer: {
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
        },
        shipping: {
          name: "International",
          street: "123 Fake St",
          town_city: "San Francisco",
          county_state: "CA",
          postal_zip_code: "94103",
          country: "US",
        },
        fulfillment: {
          // The shipping method ID for "USPS Ground" (for example)
          // You can use commerce.checkout.getShippingOptions() to get a list
          shipping_method: "ship_L1vOoZ02alRa8Z",
        },
        payment: {
          // Test Gateway is enabled by default, and is used when you submit orders with
          // your sandbox API key
          gateway: "test_gateway",
          card: {
            number: "4242 4242 4242 4242",
            expiry_month: "01",
            expiry_year: "2023",
            cvc: "123",
            postal_zip_code: "94103",
          },
        },
      };
      console.log(
        "checkoutToken.live.line_items: ",
        checkoutToken.live.line_items
      ); //convert array to object
      console.log("shippingData.shippingOption: ", shippingData.shippingOption);
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242 4242 4242 4242",
            expiry_month: "01",
            expiry_year: "2023",
            cvc: "123",
            postal_zip_code: "94103",
          },
        },
      };

      console.log("orderData", orderData);
      console.log("fakeData", fakeData);

      onCaptureCheckout(checkoutToken.id, fakeData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};
export default PaymentForm;
