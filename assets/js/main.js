fetch('https://developers.zomato.com/api/v2.1/location_details?entity_id=36932&entity_type=group&apikey=986baeddd316fba15beaab45cfc24207')

/**

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
      **/
// login de facebook 

window.fbAsyncInit = function () {
    FB.init({
        appId: '229481407597435',
        cookie: true,
        xfbml: true,
        version: "v2.5"
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            document.getElementById('status').innerHTML = "We are connected";
        } else if (response === 'not authotized') {
            document.getElementById('status').innerHTML = 'we are not logged in.'
        } else {
            document.getElementById('status').innerHTML = 'you are not logget into facebook';
        }
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            document.getElementById('status').innerHTML = "We are connected";
            document.getElementById('login')
        } else if (response === 'not authotized') {
            document.getElementById('status').innerHTML = 'we are not logged in.'
        } else {
            document.getElementById('status').innerHTML = 'you are not logget into facebook';
        }
    });
};


