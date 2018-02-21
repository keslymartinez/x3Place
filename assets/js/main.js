

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

  
// modal para iniciar sesion 

(function ($) {
    $(function () {

        //initialize all modals           
        $('.modal').modal();

        //now you can open modal from code
        $('#modal1').modal('open');

        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery);






// login de facebook 
/**
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


**/



$(function() {
    var app_id = '229481407597435';
    var scopes = 'email, user_friends, public_profile';
    var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar secion con Facebook</a>'
    var div_session = "<div id='facebook-session'>";+
                "<srtrong></strong>"+
                "<img>"+
                "<a href='#'id='logout' class='btn btn-danger'>Cerrar sesion</a>"+
                "</div>";


window.fbAsyncInit = function() {
    FB.init({
        appId: app_id,
        status  :true,
        cookie: true,
        xfbml: true,
        version: "v2.8"
    });

 FB.getLoginStatus(function(response) {
    statusChangeCallback(response, function(){

    });
 });
};
 var statusChangeCallback = function(response, callback) {
    console.log(response);

    if(response.status === 'connected') {
        getFacebookData();
    }else {
        callback(false);
    }
}

    var checkLoginState = function(callback) {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function(data) {
        callback(data);
        });
    });
   }
   var getFacebookData = function()
   { 
        FB.api('/me', function(response){
            $('#login').affter(div_session);
            $('#login').remove();
            $('#facebook-session strong').text("Bienvenido: "+response.name);
            $('#facebook-session img').attr('src', 'http//graph.facebook.com/'+response.id+'/picture?type=large');
        });
   }

   var facebookLogin = function(){
    checkLoginState(function(response){
        if(!response) {
            FB.login(function(response){
                if (response.status === 'connected')
                    getFacebookData();
            }, {scope: scopes})
        }

    })
   }

   var facebookLogout = function() {
    FB.getLoginStatus(function(response){
        if (response.status === 'connected') {
            FB.logout(function(response){
                $('#facebook-session').before(btn_login);
                $('#facebook-session').remove();
            })
        }

    });
   }

$(document).on('click', '#login', function(e) {
    e.preventDefault();

    facebookLogin();
})

$(document).on('click', '#logout', function(e) {
    e.preventDefault();

if(confirm("esta seguro?"))
    facebookLogout();
else
    return false;
})


})


