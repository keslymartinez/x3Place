$( document ).ready(function() {
    initMap();

});

 google.maps.event.addDomListener(window, 'load', initMap);﻿
function initMap(){
  
    var center = new google.maps.LatLng(-33.4317485,-70.663317);
    map = new google.maps.Map(document.getElementById('map'),{
     
     center: center,
     zoom:13
    
    }); 
    
      var request = {
     location: center,
     radius: 8047,
     types: ['park']
      };
      
         var service = new google.maps.places.PlacesService(map);

     
        service.nearbySearch(request, callback); 
     
   }
   function callback(results, status) {
            if(status == google.maps.places.PlacesServiceStatus.OK){
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }
  

function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            var infowindow = new google.maps.InfoWindow();


            google.maps.event.addListener(marker, 'click', function(){
              console.log('hola')
              infowindow.setContent(place.name);
              infowindow.open(map.this);
            })
        
        }﻿

  