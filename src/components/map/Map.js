import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMap from "google-map-react";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const Map = ({ children, mapApiKey, ...props }) => {

  return (
    <Wrapper>
      <GoogleMap bootstrapURLKeys={ {
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      } }
                 { ...props }
      >
        { children }
      </GoogleMap>
    </Wrapper>
  )
}

GoogleMap.defaultProps = {
  children: null,
}

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Map