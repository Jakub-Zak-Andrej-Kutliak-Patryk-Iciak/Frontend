import apisauce from 'apisauce'
import { getStateItem } from "../store/persistentStore";

const create = (baseURL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30000
  })
  const blobApi = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    responseType: 'blob',
    timeout: 30000
  })

  const getSecuredHeaders = (customHeaders = {}) => ({
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
      'Accept-Language': "en",
      'Authorization': `Bearer ${getStateItem("auth.token")}`
    }
  })
  const getMultipartApiHeaders = () => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept-Language': "en",
      'Authorization': `Bearer ${getStateItem("auth.token")}`
    }
  })
  const getUnsecuredHeaders = () => ({
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const createRequestFromPageDetails = ({sort, pageSize, itemsPage, search}) => ({
    offset: itemsPage.currentPage * pageSize,
    limit: pageSize,
    sort: sort,
    search: search
  })

  const signIn = (payload) => api.post(`auth/login`, payload, getUnsecuredHeaders())
  const register = (payload) => api.post(`auth/register`, payload, getUnsecuredHeaders())
  const signOut = () => api.get(`auth/signOut`, null, getUnsecuredHeaders())
  const completeRegistration = (payload) => api.post(`user/account/complete`, payload, getSecuredHeaders())

  const createPaymentIntent = (payload) => api.post('api/payment/create-payment-intent', payload, getSecuredHeaders())
  const confirmBooking = ({ paymentIntentId }) => api.post(`api/payment/confirm-booking/${paymentIntentId}`, {}, getSecuredHeaders())

  const fetchAds = () => api.get(`ads/fetch`, null, getUnsecuredHeaders())

  return {
    signIn,
    register,
    signOut,
    completeRegistration,

    createPaymentIntent,
    confirmBooking,

    fetchAds,
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production'

export const getApiBaseUrl = () => __DEV__ ? 'http://localhost:3000/' : '/'

export const securedAPI = create(`${getApiBaseUrl()}`)
export const unsecuredAPI = create(`${getApiBaseUrl()}v1/`)
