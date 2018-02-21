randombg();
(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
})();


function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  fetch(`https://api.darksky.net/forecast/10dab22d21d6e22b3182546855456e74/${lat},${long}?units=auto`)
  		.then(function(response) {
    // Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(data) {
      console.log(data);  
      $('#dayAll').append(
      	` <div class="white-text ">
      	<h3>Santiago</h3>
      	<canvas id="ico" width="50" height="50"></canvas>
      	<h1>${Math.floor(data.currently.temperature)}°C</h1>
      	
      	<table class="centered responsive-table ">
        <thead>
          <tr>
              <th>Temperatura</th>
              <th>Viento</th>
              <th>Humedad</th>
              <th>Indic Uv</th>
              <th>Presión</th>
          </tr> 
       </thead>
        <tbody>
            <tr>
              <td>${Math.floor(data.currently.temperature)}°</td>
              <td>${data.currently.windSpeed}</td>
              <td>${data.currently.windSpeed}</td>
              <td>${data.currently.uvIndex}</td>
              <td>${data.currently.pressure}</td>
          </tr>
        </tbody>
         <hr>
       </table> 
        <hr>
       `
      	);
       const skycons = new Skycons({ 
        'color': '#fafafa',
      });
      skycons.add("ico", `${data.currently.icon}`);
      skycons.play();


