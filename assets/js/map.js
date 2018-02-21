$('#initApp').addClass('show');
$('#mapContainer').addClass('hide');
$('#infoApp').addClass('hide');

$('#jump').click(function(e){
  e.preventDefault()

$('#initApp').addClass('hide');
$('#mapContainer').removeClass('hide');
$('#infoApp').removeClass('hide');

  getLocation()

});

 let totalPLaces='';
  showPosition()
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
function initMap(position){
  //console.log(position)
    var center = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude)
    localStorage.setItem('lat',position.coords.latitude)
    localStorage.setItem('long',position.coords.longitude)
    map = new google.maps.Map(document.getElementById('map'),{
     center: center,
     zoom:12 
    }); 
  // var logo = 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png'; cambia imgen
  var marker = new google.maps.Marker({
    position: center,
    icon: center.icon,
    draggable: true,
    animation: google.maps.Animation.BOUNCE,
    map: map
  });
  var request = {
 location: center,
 radius: 8000,
 types: ['park']
  };    
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback); 
  new AutocompleteDirectionsHandler(map);
}
function callback(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++) {
        totalPLaces++;
          createMarker(results[i]);
      }
  }
}
function createMarker(place) {
   //modificamos la imagen del marcador
   var image = {
      url: './assets/img/tree8.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
      var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          animation: google.maps.Animation.DROP, 
          position: place.geometry.location
      });
// Cambia la animacion del marcador 
// marker.addListener('click', toggleBounce);
// function toggleBounce() {
//       if (marker.getAnimation() !== null) {
//         marker.setAnimation(null);
//       } else {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//       }
//     }
  // var infowindow = new google.maps.InfoWindow();
    alert(`Encontramos ${totalPLaces} parques cercanos a  ti!`); 
      //console.log(marker)
      google.maps.event.addListener(marker, 'click', function() {
       localStorage.setItem('latitude', place.geometry.viewport.f.b);
       localStorage.setItem('longD', place.geometry.viewport.b.b); 
      })
    google.maps.event.addListener(marker, 'click', function() {
       //console.log(place);
       let status;
       if(place.hasOwnProperty('opening_hours') === true){
        if(place.opening_hours.open_now === true){
        status = 'Abierto'
        alert('<div><strong>' + place.name + '</strong><br>' +
          'Dirección: ' + place.vicinity + '<br>' +
          'Rating: ' +  place.rating + '<br><strong>'  + status +'</strong></div>')
          }else {
          status = 'Cerrado'
           alert('' + place.name + ' lugar se encuentra cerrado en este momento')
         }
       } else if(place.hasOwnProperty('opening_hours') === false){
          alert('<div><strong>' + place.name + '</strong><br>' +
          'Dirección: ' + place.vicinity + '<br>' +
          'Rating: ' +  place.rating + '<br></div>')
       } else {
        return
       }
    // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    //       'Dirección: ' + place.vicinity + '<br>' +
    //       'Rating: ' +  place.rating + '<br><strong>'  + status +'</strong></div>');
    // infowindow.open(map, this);
  });
}

function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;

        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);
        this.directionsDisplay.setOptions({ suppressMarkers: true });

        // new google.maps.places.Autocomplete(destinationInput);
        // new google.maps.places.Autocomplete(originInput);

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }
      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        var me = this;
         let latitude = localStorage.getItem('latitude');
        let longD = localStorage.getItem('longD');
        let lat = localStorage.getItem('lat');
        let long = localStorage.getItem('long');

        // console.log(latitude,longD)
        // console.log(lat,long)

         // var center = document.getElementById('origin-input')
         //  let destino = document.getElementById('destination-input');

        this.directionsService.route({
          origin:(`${lat},${long}`),
          destination:(`${latitude},${longD}`),
          travelMode: this.travelMode
        }, function(response, status) {
          console.log(status)
          if (status === 'OK') {

           me.directionsDisplay.setDirections(response);

          var star = response.routes[0].legs[0].start_location;
          var end = response.routes[0].legs[0].end_location;
          // console.log(JSON.stringify(star, null, ''));         
          function addMarker(pos) {
          var image = './assets/img/tree.png';
          new google.maps.Marker({
          position: pos,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: image,
          title: 'hola lab!'
          });
          }
          addMarker(star);
          addMarker(end);
          } else {
            window.alert('Lo sentimos, no hemos encontrado una ruta ' + status);
          }

        });
      };

function alertDGC(mensaje){
  var dgcTiempo=500
  var ventanaCS=`<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">${mensaje}<br><br>
  <a class="dgcAceptar waves-effect waves-light btn white-text yellow darken-4">Gracias</a></div></div></div>`;
  $('body').append(ventanaCS);
  var alVentana=$('.dgcVentana').height();
  var alNav=$(window).height();
  var supNav=$(window).scrollTop();
  $('.dgcAlert').css('height',$(document).height());
  $('.dgcVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');
  $('.dgcAlert').css('display','block');
  $('.dgcAlert').animate({opacity:1},dgcTiempo);
  $('.dgcCerrar,.dgcAceptar').click(function(e) {
    $('.dgcAlert').animate({opacity:0},dgcTiempo);
    setTimeout("$('.dgcAlert').remove()",dgcTiempo);
  });
}
window.alert = function (message) {
 alertDGC(message);
};



function showPosition() {
 let lat = localStorage.getItem('lat');
 let long = localStorage.getItem('long');
  fetch(`https://api.darksky.net/forecast/10dab22d21d6e22b3182546855456e74/${lat},${long}?units=auto`)
      .then(function(response) {
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(data) {
      console.log(data);  
      let location = data.timezone;
      $('#dayAll').append(`
  
              <li><strong>${location}</strong></li>
              <td><canvas id="ico" width="50" height="50"></canvas></td>
              <li><strong>${Math.floor(data.currently.temperature)}°C</strong></li>
        `)
       const skycons = new Skycons({ 
        'color': 'orange',
      });
      skycons.add("ico", `${data.currently.icon}`);
      skycons.play();
    });
};
