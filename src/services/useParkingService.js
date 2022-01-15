import { securedAPI } from './useApiService'
import { useState } from "react";


const useParkingService = () => {
  const [oldCoords, setOldCoords] = useState(null)
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

  const fetchParkingLots = (coords, onResolve) => {
    if (oldCoords && oldCoords.lng === coords.lng && oldCoords.lat === coords.lat) {
      return
    }
    setOldCoords({ ...coords })

    securedAPI.fetchParkingLots(coords)
      .then(({ ok, data }) => {
        if (ok) {
          results.concat(data)
          if (onResolve) {
            onResolve()
          }
          fetchAds();
          return
        }
        console.log("failed to load parking lots")
      });
    // TODO: implement me please
  }

  return {
    fetchParkingLots,
    fetchAds,
    setResults: (data) => setResults([...results, ...data]),
    parkingLots: results,
  }
}

export default useParkingService