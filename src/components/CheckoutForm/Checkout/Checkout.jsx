import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  var [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        // console.log("Token: ", token);
        setCheckoutToken(token);
      } catch (error) {
        window.location.href = "/";
      }
    };
    generateToken();
  }, [cart]);

  // console.log("checkoutToken: ", checkoutToken);

  if (order === undefined) return "Loading... ";
  if (checkoutToken === null) return <div>Loading...</div>;

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // console.log("backStep: ", backStep);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  // activeStep = 1;

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          {console.log("order", order)}
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            {" "}
            Order Ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {console.log("activeStep: ", activeStep)}
          {console.log("steps.length: ", steps.length)}
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
