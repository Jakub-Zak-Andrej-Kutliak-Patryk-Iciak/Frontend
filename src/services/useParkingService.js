import { securedAPI } from './useApiService'
import { useState } from "react";


const useParkingService = () => {
  const [results, setResults] = useState([])

  const fetchAds = (onResolve) => {
    securedAPI.fetchAds()
      .then(({ ok, data }) => {
        if (ok) {
          setResults([...results, ...data.map(ad => ({ id: ad, tag: 'ad', title: ad, }))]);
          if (onResolve) {
            onResolve()
          }
          return
        }
        console.log('failed to load ads')
      })
  }

  const fetchParkingLots = (onResolve) => {
    fetchAds()
    // TODO: implement me please
  }

  return {
    fetchParkingLots,
    fetchAds,
    parkingLots: results,
  }
}

export default useParkingService