var map = L.map('map').setView([52.041458, 1.1456667], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON('spots.json', function(spots){
  var onEachFeature = function(feature, layer) {

    var description = (feature.properties.description || '').split(' ').filter(function(x){ return x.trim() !== ''}).map(function(x){
      if (0 === x.indexOf('http://')) return '<a href="' + x + '">image</a>';
      return x;
    });
    var content = '<strong>' + feature.properties.name + '</strong><p>' + description.join(' ') + '</p>';
    
    layer.bindPopup(content);
  }
  L.geoJson(spots, { onEachFeature: onEachFeature }).addTo(map);
});