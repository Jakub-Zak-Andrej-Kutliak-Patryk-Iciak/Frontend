import ParkingLotCard from "../../components/card/ParkingLotCard";
import { AdCard } from "../../components/card";

const ListPage = () => {

  const dummyData = [
    {
      title: 'The MC driver',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 150,
      busy: '63%',
      openingHours: '05:30 - 23:30'
    },
    {
      title: 'The hupla dupla',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 4563,
      busy: '34%',
      openingHours: 'nonstop'
    },
    {
      title: 'The chupa chups',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 232,
      busy: '99%',
      openingHours: '09:00 - 16:30'
    },
    {
      title: 'The pizza hut',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 122,
      busy: '67%',
      openingHours: '09:00 - 16:30'
    },
    {
      title: 'The krowky',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 786,
      busy: '12%',
      openingHours: '09:00 - 16:30'
    },
    {
      tag: 'ad',
      title: 'Netflix',
      description: 'Watch the newest movies',
      price: '9.99dkk/month',
      link: 'https://www.netflix.com/',
    },
    {
      title: 'The ucn school',
      location: {
        address: 'Ved Stranden 22, 9000 Aalborg, Danmark',
        lat: '57.051580',
        lng: '9.918679',
      },
      totalSpots: 664,
      busy: '42%',
      openingHours: 'nonstop'
    }
  ]

  return (
    <div className="my-20 w-full">
      { dummyData.map((item) => (
        item.tag && item.tag === 'ad' ? (
          <AdCard item={ item } key={item.title}/>
        ) : (
          <ParkingLotCard item={ item } key={item.title}/>
        )
      ))
      }
    </div>
  )
}

export default ListPage