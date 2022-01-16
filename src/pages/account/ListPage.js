import PropTypes from 'prop-types'
import ParkingLotCard from "../../components/card/ParkingLotCard";
import { AdCard } from "../../components/card";

const ListPage = ({ setItemToBook, items }) => {

  // console.log('items', items)

  return (
    <div className="my-20 w-full">
      { items.map((item) => (
        item.tag && item.tag === 'ad' ? (
          <AdCard item={ item } key={item.title}/>
        ) : (
          <ParkingLotCard item={ item } key={item.name} setItemToBook={setItemToBook}/>
        )
      ))
      }
    </div>
  )
}

ListPage.propTypes = {
  items: PropTypes.array.isRequired,
  setItemToBook: PropTypes.func.isRequired,
}

export default ListPage