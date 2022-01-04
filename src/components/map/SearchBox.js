import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged = ({ map, addplace } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(20);
    }

    addplace(selected);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      <Wrapper>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <Icon name={'search'} />
          </span>
          <input ref={ (ref) => {
            this.searchInput = ref;
          } }
                 onFocus={ this.clearSearchBox }
                 className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                 placeholder="Search for anything..."
                 type="text"
                 name="search"
          />
        </label>
        {/*<input*/}
        {/*  ref={ (ref) => {*/}
        {/*    this.searchInput = ref;*/}
        {/*  } }*/}
        {/*  type="text"*/}
        {/*  onFocus={ this.clearSearchBox }*/}
        {/*  placeholder="Enter a location"*/}
        {/*/>*/}
      </Wrapper>
    );
  }
}

export default SearchBox;