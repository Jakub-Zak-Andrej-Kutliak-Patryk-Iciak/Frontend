import GoogleMap from 'google-map-react'
import { useEffect } from "react";


const MapPage = () => {

  const center = {
    lat: 57.051580,
    lng: 9.918679,
  }
  const zoom = 11

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((a) => {
      console.log('location', a.coords.latitude, a.coords.longitude)
      center.lat = a.coords.latitude
      center.lng = a.coords.longitude
    })
  }, [])


  return (
    <div className="w-full" style={{ height: '80vh' }}>
      <GoogleMap bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                 defaultCenter={center}
                 defaultZoom={zoom}
                 center={center}
      />
    </div>
  )
}

export default MapPage