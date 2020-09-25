function createDrivingDirectionsMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 500,
    });
  } else {
    document.getElementById("map").innerHTML =
      "No support for geolocation, we cant't find you";
  }
}

function OnSuccess(position) {
  showMap(position.coords.latitude, position.coords.longitude);
}

function OnError() {
  let mapDiv = document.getElementById("map");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapDiv.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      mapDiv.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      mapDiv.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      mapDiv.innerHTML = "An unknown error occurred.";
      break;
  }
}

function showMap(lat, long) {
  let directionService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();

  let route = {
    origin: new google.maps.LatLng(lat, long),
    destination: "Grote Markt, Brussel",
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
  };

  let mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(50.85045, 4.34878),
    mapTypeId: google.maps.mapTypeId.ROADMAP,
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("driving-directions"));
  directionService.route(route, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}
