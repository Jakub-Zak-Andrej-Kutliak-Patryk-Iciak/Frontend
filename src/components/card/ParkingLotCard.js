import Card from './Card';
import PropTypes from 'prop-types'
import { Icon } from "semantic-ui-react";
import { AppLink } from "../index";


const ParkingLotCard = ({ item, onCancelClick, setItemToBook }) => {

  return (
    <Card customStyle="bg-teal-400 relative">
      <div className="font-bold mb-6">{ item.title }</div>
      <div>Total spots: { item.totalSpots }</div>
      <div>Busy: { item.busy }</div>
      <div>Opening hours: { item.openingHours }</div>
      <div className="mt-2">
        <a href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`}
           target={'_blank'}
           rel="noreferrer"
        >
          {/*{ item.location.address }*/}
          Show on map
        </a>
      </div>
      <div className="mt-2">
        <AppLink text={'Book a spot'} onClick={() => setItemToBook(item)} />
      </div>
      {onCancelClick &&
      <Icon name={'cancel'} className="absolute top-3 right-3 cursor-pointer" size="small" onClick={onCancelClick}/>
      }
    </Card>
  )
}

ParkingLotCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCancelClick: PropTypes.func,
  setItemToBook: PropTypes.func.isRequired,
}

export default ParkingLotCard