/* eslint-disable */

export const displayMap=(locations)=>{
  mapboxgl.accessToken =
  'pk.eyJ1IjoieXVkaGFqaXQiLCJhIjoiY2tvZ3lmN3Z2MDV1dTJ3cm1teGtlcDM2eCJ9.qEZaWyw960HYtYkrP7a4Fw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  scrollZoom: false
  // center: [-118.113491, 34.111745],
  // zoom: 4,
});
const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  //Create Marker
  const el = document.createElement('div');
  el.className = 'marker';
  //Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  //add popup
  new mapboxgl.Popup({
    offset:30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>${loc.day}:${loc.description}</p>`);
  //Extends map bounds to include currnet location
  bounds.extend(loc.coordinates).addTo(map);
});
map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});

}

