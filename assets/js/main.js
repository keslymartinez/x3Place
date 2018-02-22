

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
            console.log(response)
            let name = response.name;
            let img = 'http//graph.facebook.com/'+response.id+'/picture?type=large';
            $( '#div_session').append(`
                <div id='facebook-session'><srtrong>${name}</strong>
                <img src=${img}>
                <a href='#' id='logout' class='btn-flat yellow-text text-darken-4'> Cerrar sesion</a>
                </div>`);
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
                $('#initApp').removeClass('hide');
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

if(confirm("Desea cerrar sesion?"))
    facebookLogout();
else
    return false;
})


})






