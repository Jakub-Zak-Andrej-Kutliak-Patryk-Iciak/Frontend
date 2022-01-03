import Card from './Card';


const ParkingLotCard = ({ item }) => {

  return (
    <Card customStyle="bg-teal-400">
      <div className="font-bold mb-6">{ item.title }</div>
      <div>Total spots: { item.totalSpots }</div>
      <div>Busy: { item.busy }</div>
      <div>Opening hours: { item.openingHours }</div>
      <div className="mt-2">
        <a href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`}>
          {/*{ item.location.address }*/}
          Show on map
        </a>
      </div>
    </Card>
  )
}

export default ParkingLotCard