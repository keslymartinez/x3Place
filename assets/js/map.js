google.maps.event.addDomListener(window, 'load', initMap);
 let totalPLaces='';


$( document ).ready(function() {
     $('.modal').modal();

        //now you can open modal from code
        $('#modal1').modal('open');

        //or by click on trigger
        $('.trigger-modal').modal();

     getLocation()
});
(function ($) {
    $(function (){

        //initialize all modals           
        $('.modal').modal();

        // //now you can open modal from code
        // $('#modal1').modal('open');

        // //or by click on trigger
        // $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
function initMap(position){
    var center = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude)
    map = new google.maps.Map(document.getElementById('map'),{
     center: center,
     zoom:15 
    }); 


  // var logo = 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png'; cambia imgen
  var marker = new google.maps.Marker({
    position: center,
    icon: center.icon,
    draggable: true,
    map: map
  });

  var request = {
 location: center,
 radius: 1000,
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
   var placeLoc = place.geometry.location;

   //modificamos la imagen del marcador
   var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

      var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          animation: google.maps.Animation.DROP, //google.maps.Animation.BOUNCE,
          // customInfo:{'href':`#modal1` }, agregar atritubutos al markador
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
    
      var infowindow = new google.maps.InfoWindow();
    //  alert(`Encontramos ${totalPLaces} parques cercanos a  ti!`);  ACTIVAR AL FINALIZAR EL PROYECTO
      //console.log(marker)
     
    google.maps.event.addListener(marker, 'click', function() {
      //$(`#modal1`).modal('open');
       console.log(place);
       let status;
       if(place.opening_hours.open_now === true){
        status = 'Abierto'
       } else {
        status = 'Cerrado'
       }
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Dirección: ' + place.vicinity + '<br>' +
          'Rating: ' +  place.rating + '<br><strong>'  + status +'</strong></div>');
    infowindow.open(map, this);
  });
}





    

//             google.maps.event.addListener(marker, 'click',function(){
//               console.log(place)
//   var dgcTiempo=500
//   var ventanaCS=`<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">${name}<br><a class="waves-effect waves-light btn white-text  deep-orange accent-4 modal-trigger pulse" href="#modal1">See More</a></div></div></div>`;
//   $('body').append(ventanaCS);
//   var alVentana=$('.dgcVentana').height();
//   var alNav=$(window).height();
//   var supNav=$(window).scrollTop();
//   $('.dgcAlert').css('height',$(document).height());
//   $('.dgcVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');
//   $('.dgcAlert').css('display','block');
//   $('.dgcAlert').animate({opacity:1},dgcTiempo);
//   $('.dgcCerrar,.dgcAceptar').click(function(e) {
//     $('.dgcAlert').animate({opacity:0},dgcTiempo);
//     setTimeout("$('.dgcAlert').remove()",dgcTiempo);
//   });
// })
  //             console.log(place)
  //             let name = place.name
  //             let id = place.place_id
  //             let name2= place.name
  //             let name3 = place.name
               
  //              content: 'Hello'
  //              alert(name, id)

             
  //             $("#modal").empty();


  //              $("#modal").append(` 
  // <!-- Modal Structure -->
  // <div id="modal1" class="modal">
  //   <div class="modal-content">
  //     <h4>${name}</h4>
  //     <p>A bunch of text</p>
  //   </div>
  //   <div class="modal-footer">
  //     <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
  //   </div>
  // </div>`);
  //                $('.modal').modal();
  //                 $(`#modal${id}`).modal('open');
              
               
  //             infowindow.setContent(place.name);
  //             infowindow.open(map.this);
  //           })
        
        // }﻿

function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

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

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };



        


function alertDGC(mensaje){
  var dgcTiempo=500
  var ventanaCS=`<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">${mensaje}<br><br>
  <a class="dgcAceptar waves-effect waves-light btn white-text deep-orange accent-4">Gracias</a></div></div></div>`;
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
