import ParkingLotCard from "../../components/card/ParkingLotCard";
import { AdCard } from "../../components/card";
import { getStateItem } from "../../store/persistentStore";

const ListPage = ({ setItemToBook }) => {


  return (
    <div className="my-20 w-full">
      { getStateItem('testItems').map((item) => (
        item.tag && item.tag === 'ad' ? (
          <AdCard item={ item } key={item.title}/>
        ) : (
          <ParkingLotCard item={ item } key={item.title} setItemToBook={setItemToBook}/>
        )
      ))
      }
    </div>
  )
}

export default ListPage