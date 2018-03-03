function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -7.78278, lng: 110.36083},
    zoom: 13  
  });

  directionsDisplay.setMap(map);

  document.getElementById('search').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  var start = document.getElementById('startFrom');
  var finish = document.getElementById('finishTo');


  var autocompleteStart = new google.maps.places.Autocomplete(start);
  var autocompleteFinish = new google.maps.places.Autocomplete(finish);

  autocompleteStart.addListener('place_changed', function() {

    var place = autocompleteStart.getPlace();
   
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    sessionStorage.setItem("startAddress",address);
    sessionStorage.setItem("startLat",latitude);
    sessionStorage.setItem("startLng",longitude);
  });

  autocompleteFinish.addListener('place_changed', function() {

    var place = autocompleteFinish.getPlace();

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    sessionStorage.setItem("finishAddress",address);
    sessionStorage.setItem("finishLat",latitude);
    sessionStorage.setItem("finishLng",longitude);
  });

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {          

    try {
      var startLat  = parseFloat(sessionStorage.getItem("startLat"));
      var startLng  = parseFloat(sessionStorage.getItem("startLng"));
      var finishLat = parseFloat(sessionStorage.getItem("finishLat"));
      var finishLng = parseFloat(sessionStorage.getItem("finishLng"));

      var selectedMode = document.getElementById('mode').value;
      
      directionsService.route({	
        origin: {lat: startLat, lng: startLng },
        destination: {lat: finishLat, lng: finishLng }, 
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });  
    }catch(e){
      if(e instanceof TypeError) {
        window.alert('Insert starting point and destination');
      }
    }            
  }
}