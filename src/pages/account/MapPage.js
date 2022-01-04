import { useState } from "react";
import Marker from "../../components/map/Marker";
import SearchBox from "../../components/map/SearchBox";
import GoogleMap from "google-map-react";
import { ParkingLotCard } from "../../components/card";
import { getStateItem } from "../../store/persistentStore";
import { Icon } from "semantic-ui-react";


const MapPage = ({ mapApiKey }) => {

  const [coordinates, setCoordinates] = useState({ lat: 57.051580, lng: 9.918679 })
  const [activeItem, setActiveItem] = useState(null)

  const [isLoadingCurrentLocation, setLoadingCurrentLocation] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [zoom, setZoom] = useState(14)

  const setCoordsToCurrentLocation = () => {
    console.log('loading current location..',)
    setLoadingCurrentLocation(true)
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log('current location found: ', coords)
      setCoordinates({ lat: coords.latitude, lng: coords.longitude })
      setLoadingCurrentLocation(false)
    })
  }

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
  }

  return (
    <div className="w-full relative" style={ { height: '85vh' } }>
      { mapApi && mapInstance &&
        <div className="absolute z-10 top-1/10 flex w-full align-middle justify-center">
          <div className="w-full mx-8 md:w-1/2 max-w-sm">
            <SearchBox map={ mapInstance } mapApi={ mapApi } addplace={ (place) => setPlaces([...places, place]) }/>
          </div>
        </div>
      }
      <GoogleMap bootstrapURLKeys={ {
        key: mapApiKey,
        libraries: ['places', 'geometry']
      } }
                 defaultCenter={ coordinates }
                 defaultZoom={ zoom }
                 yesIWantToUseGoogleMapApiInternals
                 onGoogleApiLoaded={ ({ map, maps }) => apiHasLoaded(map, maps) }
                 center={ coordinates }
      >
        { getStateItem('testItems') && getStateItem('testItems').filter(item => item.location).map(item => (
          <Marker key={ item.id }
                  text={ item.busy }
                  onClick={ (event) => setActiveItem(item) }
                  { ...item.location }
          />
        )) }
      </GoogleMap>

      <div className={ `absolute z-10 bottom-8 left-3 bg-white shadow-xl rounded-sm flex justify-center p-2 pl-2 px-1 ${isLoadingCurrentLocation ? 'cursor-not-allowed':'cursor-pointer'}` }
           onClick={setCoordsToCurrentLocation}
           aria-disabled={isLoadingCurrentLocation}
      >
        <Icon name={'crosshairs'}
              color={'grey'}
              size={'big'}
              className={ isLoadingCurrentLocation ? "animate-spin-slow" : ""}
        />
      </div>

      { activeItem &&
      <div className="absolute bottom-1/5 flex justify-center w-full">
        <div className="w-full max-w-xs">
          <ParkingLotCard item={ activeItem } onCancelClick={() => setActiveItem(null)}/>
        </div>
      </div>
      }
    </div>
  )
}

export default MapPage