import Card from './Card';


const AdCard = ({ item }) => {

  return (
    <Card customStyle={'bg-amber-500'}>
      <div className="font-bold h-20 flex justify-center">
        <div className="my-auto pb-2">
          { item.title }
        </div>
      </div>
      {/*<div>{ item.description }</div>*/}
      {/*<div>{ item.price }</div>*/}
      {/*<div className="mt-2">*/}
      {/*  <a href={item.link}*/}
      {/*     target={'_blank'}*/}
      {/*     rel="noreferrer"*/}
      {/*  >*/}
      {/*    Visit*/}
      {/*  </a>*/}
      {/*</div>*/}
    </Card>
  )
}

export default AdCard