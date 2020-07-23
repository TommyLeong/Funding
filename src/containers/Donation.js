import React, { useState } from "react";
import "./styles/Donation.css";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ActionButton from "../components/ActionButton";
import UrlPath from "../configs/UrlPath";
import EN from "../theme/language/en.json";
import * as validation from "../helpers/validation";
import StationProgress from "../components/StationProgress";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const Donation = () => {
  const history = useHistory();
  const location = useLocation();
  const { collectedAmount, busStation } = location.state;

  const [state, setState] = useState({
    name: "",
    nameError: false,
    nameErrorHelper: "",
    email: "",
    emailError: false,
    emailErrorHelper: "",
    donationAmount: "",
    donationAmountError: "",
    donationAmountErrorHelper: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    paymentDetailsError: false,
    paymentDetailsErrorHelper: "",
  });

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    meta,
  } = usePaymentInputs();

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
      width: "25ch",
      paddingTop: "5px",
    },
  }));

  const classes = useStyles();

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const handleChange = (event) => {
    setState({ ...state, donationAmount: event.target.value });
  };

  const handleCardNumberChange = (event) => {
    setState({
      ...state,
      cardNumber: event.target.value,
      paymentDetailsError: false,
    });
  };

  const handleCardExpiryChange = (event) => {
    setState({
      ...state,
      expiry: event.target.value,
      paymentDetailsError: false,
    });
  };

  const handleCardCVCChange = (event) => {
    setState({ ...state, cvc: event.target.value, paymentDetailsError: false });
  };

  const handleNameOnBlur = (event) => {
    let error = true;
    let errorHelper =
      "Name should contains only alphabets and only spaces between name are allowed";

    if (validation.validateOnlySpacingCharacters(event.target.value)) {
      error = false;
      errorHelper = "";
    }

    setState({
      ...state,
      nameError: error,
      nameErrorHelper: errorHelper,
    });
  };

  const handleAmountOnBlur = (event) => {
    // const floatValue = parseFloat(event.target.value).toFixed(2);
    let error = true;
    let errorHelper =
      "Only numbers input is accepted. Please input amount with 2 decimal values.";

    if (validation.validateOnlyDecimalValues(event.target.value)) {
      error = false;
      errorHelper = "";
    }

    if (event.target.value <= 0) {
      error = true;
      errorHelper = "Donation amount should be larger than 0.00";
    }

    setState({
      ...state,
      donationAmountError: error,
      donationAmountErrorHelper: errorHelper,
    });
  };

  const handleEmailOnBlur = (event) => {
    let error = true;
    let errorHelper = "Incorrect email format";

    if (
      validation.validateEmail(event.target.value) ||
      event.target.value.length <= 0
    ) {
      error = false;
      errorHelper = "";
    }

    setState({
      ...state,
      emailError: error,
      emailErrorHelper: errorHelper,
    });
  };

  const validateInputComplete = () => {
    let nameError = false;
    let nameErrorHelper = "";
    let donationAmountError = false;
    let donationAmountErrorHelper = "";
    let paymentDetailsError = false;
    let paymentDetailsErrorHelper = "";

    if (state.name.length <= 0) {
      nameError = true;
      nameErrorHelper = "Kindly input your name";
    }

    if (state.donationAmount <= 0) {
      donationAmountError = true;
      donationAmountErrorHelper = "Kindly provide donation valid amount";
    }

    if (
      state.cardNumber <= 0 ||
      state.expiry.length <= 0 ||
      state.cvc.length <= 0 ||
      meta.error !== undefined
    ) {
      paymentDetailsError = true;
      paymentDetailsErrorHelper =
        "Kindly please verify your payment card information";
    }

    setState({
      ...state,
      nameError,
      nameErrorHelper,
      donationAmountError,
      donationAmountErrorHelper,
      paymentDetailsError,
      paymentDetailsErrorHelper,
    });

    if (nameError || donationAmountError || paymentDetailsError) {
      return false;
    }
    return true;
  };

  const renderDonationForm = () => {
    return (
      <div>
        <div className="donationContainerFormTitle">Bus Stop Info</div>
        <div className={classes.root}>
          <StationProgress
            stationName={busStation}
            collectedAmount={collectedAmount}
            callbackAction={() => {}}
            selected
          />
        </div>
        <div className="donationContainerFormTitle">Payment information</div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Donator Name"
            placeholder="Eg, Joshua Ng"
            required
            error={state.nameError}
            helperText={state.nameErrorHelper}
            onChange={handleNameChange}
            onBlur={handleNameOnBlur}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Donation Amount"
            placeholder="Eg, 123.91"
            required
            error={state.donationAmountError}
            helperText={state.donationAmountErrorHelper}
            onChange={handleChange}
            onBlur={handleAmountOnBlur}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Email Address"
            placeholder="Eg, example@mail.com"
            error={state.emailError}
            helperText={state.emailErrorHelper}
            onChange={handleEmailChange}
            onBlur={handleEmailOnBlur}
          />
        </form>
        <div className="donationContainerFormBtn"></div>
      </div>
    );
  };

  const renderPaymentForm = () => {
    return (
      <div className="donationContainerPaymentMethod">
        <div className="donationContainerFormTitle">Payment Method</div>
        <div className="donationContainerPaymentMethodInfo">
          <div>
            Currently we accepts only Debit / Credit card as our payment method.
          </div>
          <img
            src={require(`../theme/media/acceptedCards.png`)}
            style={{
              width: 180,
              height: 150,
              paddingTop: 10,
            }}
            alt="img"
          />
        </div>
        <div className="donationContainerFormTitle">
          Debit/Credit Card Information
        </div>
        <div>
          <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input
              {...getCardNumberProps({ onChange: handleCardNumberChange })}
            />
            <input
              {...getExpiryDateProps({ onChange: handleCardExpiryChange })}
            />
            <input {...getCVCProps({ onChange: handleCardCVCChange })} />
          </PaymentInputsWrapper>
        </div>
        <div className="donationContainerPaymentMethodErrorMsg">
          {state.paymentDetailsError && state.paymentDetailsErrorHelper}
        </div>

        <div className="donationContainerFormBtn">
          <ActionButton
            onClick={async () => {
              if (
                !state.nameError &&
                !state.emailError &&
                !state.donationAmountError &&
                validateInputComplete()
              ) {
                history.push({
                  pathname: UrlPath.payment,
                  // .replace(":stationName", busStation)
                  state: {
                    station: busStation,
                    donatorName: state.name,
                    donationAmount: state.donationAmount,
                    email: state.email,
                  },
                });
              }
            }}
            buttonName="MAKE PAYMENT"
          />
        </div>
      </div>
    );
  };

  const renderReminderMessage = () => {
    if (collectedAmount >= 700) {
      return (
        <div className="donationContainerReminder">
          A gentle reminder, the bus stop selected has reached their target
          amount of 700. Consider donate to bus stop that has not reach the
          target amount.{" "}
          <span role="img" aria-label="smile">
            🙂
          </span>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div className="body">
      <div className="donationContainer">
        <div className="donationContainerTitle">
          <h3>Donation to {busStation} Bus Stop </h3>
        </div>
        <div className="donationContainerReminder">
          <div>
            Thank you for your generous support to the community Bus Stop. We
            are thrilled to have your support.
          </div>
          <div>
            Through your donation we have been able to improve our public
            transportation infrastructure and continue serving the community
            better!
          </div>
          {renderReminderMessage()}
        </div>

        <div className="donationContainerForm">
          <div>{renderDonationForm()}</div>
          <div>{renderPaymentForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
