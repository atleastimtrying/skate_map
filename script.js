var map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());
var zoom=16;
var markers = new OpenLayers.Layer.Markers( "Markers" );
var center = new OpenLayers.LonLat( 1.1456667 , 52.041458000000006 ).transform(
  new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
  map.getProjectionObject() // to Spherical Mercator Projection
);
map.addLayer(markers);
map.setCenter(center, zoom);

var addMarker = function(lon, lat){
  var lonLat = new OpenLayers.LonLat( lon, lat ).transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    map.getProjectionObject() // to Spherical Mercator Projection
  );
  var marker = new OpenLayers.Marker(lonLat);
  markers.addMarker(marker);
  return marker;
};

var makeSpot = function(spot){
  var marker = addMarker(spot.lon, spot.lat);
};

$.getJSON('spots.json', function(spots){
  spots.forEach(makeSpot);
});
