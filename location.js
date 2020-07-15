if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Browser doesn't support.");
  }

function showPosition(position) {
  var  Latitude =  position.coords.latitude;
  var Longitude =  position.coords.longitude;
  var request = new XMLHttpRequest();
  request.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+Latitude+"&lon="+Longitude+"&zoom=18&addressdetails=1", true);
  request.responseType = 'document';
  request.overrideMimeType('text/xml');
  request.onload = function () {
    if (request.readyState === request.DONE) {
      if (request.status === 200) {
        console.log(request.responseXML);
        var city = request.responseXML.getElementsByTagName("city")[0].childNodes[0].nodeValue;
        if(city != "Bengaluru"){
          alert("Sorry we do not deliver in your city!!");
        } 
      }
    }
  };
  request.send(null);
}
