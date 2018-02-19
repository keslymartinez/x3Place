fetch('https://developers.zomato.com/api/v2.1/location_details?entity_id=36932&entity_type=group&apikey=986baeddd316fba15beaab45cfc24207')



    .then(function(response) {
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    })
var infoWindow = new google.maps.InfoWindow({map: map});
    // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      



