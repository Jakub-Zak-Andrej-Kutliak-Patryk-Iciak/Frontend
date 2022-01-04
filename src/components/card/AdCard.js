import Card from './Card';


const AdCard = ({ item }) => {

  return (
    <Card customStyle={'bg-amber-500'}>
      <div className="font-bold mb-6">{ item.title }</div>
      <div>{ item.description }</div>
      <div>{ item.price }</div>
      <div className="mt-2">
        <a href={item.link} target={'_blank'}>Visit</a>
      </div>
    </Card>
  )
}

export default AdCard