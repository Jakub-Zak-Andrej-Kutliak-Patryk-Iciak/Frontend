

const Card = ({ children, customStyle = '', style }) => {

  return (
    <div className={ `${customStyle} border border-black rounded-2xl p-5 mx-3 pb-2 mb-3 shadow-xl` }
         style={style}
    >
      {children}
    </div>
  )
}

export default Card