import Card from './Card';
import { Icon } from "semantic-ui-react";


const ParkingLotCard = ({ item, onCancelClick }) => {

  return (
    <Card customStyle="bg-teal-400 relative">
      <div className="font-bold mb-6">{ item.title }</div>
      <div>Total spots: { item.totalSpots }</div>
      <div>Busy: { item.busy }</div>
      <div>Opening hours: { item.openingHours }</div>
      <div className="mt-2">
        <a href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`}
           target={'_blank'}
        >
          {/*{ item.location.address }*/}
          Show on map
        </a>
      </div>
      {onCancelClick &&
      <Icon name={'cancel'} className="absolute top-3 right-3" size="small" onClick={onCancelClick}/>
      }
    </Card>
  )
}

export default ParkingLotCard