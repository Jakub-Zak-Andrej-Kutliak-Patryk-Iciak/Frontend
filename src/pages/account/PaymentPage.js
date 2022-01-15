import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/form/CheckoutForm";
import usePaymentService from "../../services/usePaymentService";


const PaymentPage = ({ item, user }) => {
  const [clientSecret, setClientSecret] = useState(null)
  const { stripePromise, createPaymentIntent } = usePaymentService()

  useEffect(() => {
    console.log('user', user)
    createPaymentIntent({ ...item, description: `Parking spot at ${item.name}`, clientName: user.firstName, email: user.email  }, setClientSecret)
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="flex flex-col align-middle justify-center">
      { item &&
      <div>
        <h3 className="mb-2 font-extrabold">
          { item.title }
        </h3>
        <div>
          { item.location.address }
        </div>
      </div>
      }
      <div className="m-2">
        { clientSecret && stripePromise && (
          <Elements options={ options } stripe={ stripePromise }>
            <CheckoutForm clientSecret={ clientSecret } item={item}/>
          </Elements>
        ) }
      </div>
    </div>
  );
}

PaymentPage.propTypes = {
  item: PropTypes.object.isRequired,
}

export default PaymentPage
