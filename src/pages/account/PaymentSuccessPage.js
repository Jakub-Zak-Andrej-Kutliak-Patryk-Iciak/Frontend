import React, { useEffect } from "react";
import { useQuery } from "../../helpers/hooks";
import { Divider } from "semantic-ui-react";
import usePaymentService from "../../services/usePaymentService";
import { useHistory } from "react-router-dom";


const PaymentSuccessPage = () => {

  const query = useQuery()
  const { push } = useHistory()
  const { confirmBooking } = usePaymentService()

  useEffect(() => {
    if (!query.get('title')) {
      push('/map')
    } else if (query.get('payment_intent_client_secret')) {
      confirmBooking({
        paymentIntentId: query.get('payment_intent_client_secret')
      }, () => push(`/payment/success?geo=${query.get('geo')}&title=${query.get('title')}&address=${query.get('address')}`));
    }
  }, [])

  return (
    <div className="flex flex-col align-middle justify-center p-3">
      <h1 className="font-bold capitalize">Lets hit the road!</h1>
      <h5 className="capitalize">{ query.get('title') }</h5>
      <h6 className="capitalize">{ query.get('address') }</h6>
      <div className="mt-16">
        <a href={`https://www.google.com/maps/search/?api=1&query=${ query.get('geo') }`}
           target={'_blank'}
           rel="noreferrer"
        >
          Navigate now
        </a>
      </div>
      <Divider horizontal>Or</Divider>
      <div className="text-xs">
        <a href={`/account`}>
          Later
        </a>
      </div>
    </div>
  );
}

export default PaymentSuccessPage
