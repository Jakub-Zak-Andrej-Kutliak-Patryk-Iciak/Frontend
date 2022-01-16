import React, { useEffect, useMemo, useState } from "react";
import './CheckoutForm.css'
import PropTypes from 'prop-types'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Segment, Grid, Loader } from "semantic-ui-react";
import { AppButton } from "../index";
import { useHistory } from "react-router-dom";
import { LeftBackArrowIcon } from "../icons";


const useResponsiveFontSize = () => {
  const getFontSize = () => (window.innerWidth < 450 ? '16px' : '18px')
  const [fontSize, setFontSize] = useState(getFontSize)

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return fontSize
}

const useOptions = () => {
  const fontSize = useResponsiveFontSize()
  return useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  )
}


const CheckoutForm = ({ clientSecret, item, cancelPayment }) => {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()
  const { push } = useHistory()

  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) return

    stripe.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            push('/payment/success')
            break;
          case "processing":
            setLoading(true)
            break;
          case "requires_payment_method":
            setLoading(false)
            // setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            setLoading(false)
            break;
        }
      });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment/success?geo=${item.location.lat},${item.location.lng}&title=${item.name}&provider=${item.parkingProvider}`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setLoading(false)
  }

  return (
    <Segment style={ { margin: '0 auto', maxWidth: '500px' } }>
      {stripe && elements ? (
        <form onSubmit={ handleSubmit }>
          <label className={ 'stripe-label' }>
            <div className="absolute left-2 top-2 p-2" onClick={cancelPayment}><LeftBackArrowIcon color={"orange"} /></div>
            <div className="capitalize">Enter Card details</div>
            <PaymentElement options={ options }
                            onReady={ () => {
                              console.log('CardElement [ready]')
                            } }
                            onChange={ event => {
                              console.log('CardElement [change]', event)
                            } }
                            onBlur={ () => {
                              console.log('CardElement [blur]')
                            } }
                            onFocus={ () => {
                              console.log('CardElement [focus]')
                            } }
            />
          </label>
          <Grid.Row stretched>
            <Grid.Column textAlign={ 'center' }>
              <AppButton disabled={ !stripe } loading={isLoading} text={ 'Pay' }/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="text-amber-500 font-medium text-xs mt-2 capitalize">
            <Grid.Column>
              { message }
            </Grid.Column>
          </Grid.Row>
        </form>
      ) : (
        <Loader active/>
      ) }
    </Segment>
  );
}

CheckoutForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  cancelPayment: PropTypes.func.isRequired,
}

export default CheckoutForm
