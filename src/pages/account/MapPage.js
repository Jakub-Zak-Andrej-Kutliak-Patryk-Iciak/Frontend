import { useState } from "react";
import Marker from "../../components/map/Marker";
import PropTypes from 'prop-types'
import SearchBox from "../../components/map/SearchBox";
import GoogleMap from "google-map-react";
import { ParkingLotCard } from "../../components/card";
import { Icon } from "semantic-ui-react";


const MapPage = ({ mapApiKey, defaultCenter, onRefreshRequested, items, setItemToBook }) => {

  const [coordinates, setCoordinates] = useState(defaultCenter)
  const [activeItem, setActiveItem] = useState(null)

  const [isLoadingCurrentLocation, setLoadingCurrentLocation] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [zoom, setZoom] = useState(14)

  const setCoordsToCurrentLocation = () => {
    console.log('loading current location..')
    setLoadingCurrentLocation(true)
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const newCoords = { lat: coords.latitude, lng: coords.longitude }
      console.log('current location found: ', newCoords)
      setCoordinates(newCoords)
      onRefreshRequested(newCoords)
      setLoadingCurrentLocation(false)
    })
  }

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)

    maps.event.addListener(map, "center_changed", () => {
      const center = { lat: map.center.lat(), lng: map.center.lng() }
      setCoordinates(center)
    })
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
      { mapApi && mapInstance && coordinates.lat !== defaultCenter.lat &&
        <div className="absolute z-20 top-1/5 flex w-full align-middle justify-center">
          <div className="rounded-2xl h-8 pt-1 w-24 mx-8 bg-amber-600 text-white" onClick={() => onRefreshRequested(coordinates)}>
            Search
          </div>
        </div>
      }
      <GoogleMap bootstrapURLKeys={ {
        key: mapApiKey,
        libraries: ['places', 'geometry']
      } }
                 defaultCenter={ defaultCenter }
                 // onDragEnd={() => onCenterChanged({ lat: mapInstance.center.lat(), lng: mapInstance.center.lng() })}
                 defaultZoom={ zoom }
                 yesIWantToUseGoogleMapApiInternals
                 onGoogleApiLoaded={ ({ map, maps }) => apiHasLoaded(map, maps) }
                 // center={ coordinates }

      >
        { items && items.filter(item => item.location).map(item => (
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
          <ParkingLotCard item={ activeItem } onCancelClick={() => setActiveItem(null)} setItemToBook={setItemToBook}/>
        </div>
      </div>
      }
    </div>
  )
}

MapPage.propTypes = {
  mapApiKey: PropTypes.string.isRequired,
  defaultCenter: PropTypes.object.isRequired,
  onRefreshRequested: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  setItemToBook: PropTypes.func.isRequired,
}

export default MapPage