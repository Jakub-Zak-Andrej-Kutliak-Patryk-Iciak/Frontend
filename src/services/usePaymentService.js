import { securedAPI } from './useApiService'
import { loadStripe } from "@stripe/stripe-js";

const usePaymentService = () => {

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  const testPayload = {
    currency: 'dkk',
    amount: 150000,
    description: 'API test',
  }

  const createPaymentIntent = (payload, callback) => {
    securedAPI.createPaymentIntent({ ...testPayload, ...payload })
      .then(res => res.data)
      .then(data => callback(data.clientSecret))
  }

  const confirmBooking = (payload, callback) => {
    securedAPI.confirmBooking(payload)
      .then(res => callback(res))
  }

  return {
    stripePromise,
    createPaymentIntent,
    confirmBooking,
  }
}

export default usePaymentService
