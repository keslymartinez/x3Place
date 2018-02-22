

$(function() {

    var scopes = 'email, user_friends, public_profile';
    // var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar secion con Facebook</a>'


 var statusChangeCallback = function(response, callback) {
    console.log(response);

    if(response.status === 'connected') {
        getFacebookData();
         $('#initApp').addClass('hide');
            $('#mapContainer').removeClass('hide');
            $('#infoApp').removeClass('hide');
              getLocation()        
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
            $( '#div_session').append(`<div id='facebook-session'><srtrong></strong><img><a href='#' id='logout' class='btn-flat yellow-text text-darken-4'>Cerrar sesion</a></div>`);
            $('#facebook-session strong').text("Bienvenido: "+response.name);
            $('#facebook-session img').attr('src', 'http//graph.facebook.com/'+response.id+'/picture?type=large');
        });
}


   function facebookLogin(){
    checkLoginState(function(response){
        if(!response) {
            FB.login(function(response){
                if (response.status === 'connected')
                    getFacebookData();
            $('#initApp').addClass('hide');
            $('#mapContainer').removeClass('hide');
            $('#infoApp').removeClass('hide');
              getLocation()
            console.log(response.status)

            }, {scope: scopes})
        }

    })
   }

   var facebookLogout = function() {
    FB.getLoginStatus(function(response){
        if (response.status === 'connected') {
            FB.logout(function(response){
                $('#facebook-session').remove();
                $('#initApp').addClass('show');
                $('#mapContainer').addClass('hide');
                $('#infoApp').addClass('hide');
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






