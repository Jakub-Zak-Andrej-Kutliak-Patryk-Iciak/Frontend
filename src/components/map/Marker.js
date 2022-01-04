import React from 'react';
import PropTypes from 'prop-types';


const Marker = ({ text, onClick = null }) => {

  return (
    <div className="absolute z-10 border bg-amber-500 text-black py-1 px-2 rounded-2xl cursor-pointer hover:z-20"
         onClick={onClick}
    >
      { text }
    </div>
  )
}

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}

export default Marker