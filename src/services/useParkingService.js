import { securedAPI } from './useApiService'
import { useState } from "react";


const useParkingService = () => {
  const [oldCoords, setOldCoords] = useState(null)
  const [results, setResults] = useState([])

  const fetchAds = (onResolve) => {
    securedAPI.fetchAds()
      .then(({ ok, data }) => {
        if (ok) {
          if (onResolve) {
            onResolve(data.map(ad => ({ tag: 'ad', title: ad })))
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
          const parkingData = data.parkingData
          if (!Array.isArray(parkingData) || parkingData.length === 0) return

          if (onResolve) {
            onResolve(data)
          }
          fetchAds((innerData) => {
            setResults(parkingData.map(spot => ({
              id: spot.name,
              name: spot.name,
              parkingProvider: spot.parkingProvider,
              capacity: spot.capacity,
              available: spot.busy,
              busy: `${((spot.busy / spot.capacity) * 100.).toFixed(2)}%`,
              location: {
                lat: spot.latitude,
                lng: spot.longitude,
              },
            })).concat(innerData))
          });
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