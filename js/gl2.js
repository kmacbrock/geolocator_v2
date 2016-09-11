var ipScript = document.createElement("script");
	ipScript.type = "text/javascript";
	ipScript.src = "https://l2.io/ip.js?var=myip";
	document.head.appendChild(ipScript);
	
var gmScript = document.createElement("script");
	gmScript.type = "text/javascript";
	gmScript.src = "http://maps.googleapis.com/maps/api/js?sensor=true";
	document.head.appendChild(gmScript);
	
function testClick(){
			getIP();
			getLocation();
						
		function getLocation(){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(getAddress, showError, {
					maximumAge : 600000,
					timeout : 100000,
					enableHighAccuracty : true
					});
				} else {
					alert("Geolocation is not supported by this browser.");
				}
		}
        function getAddress(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
			document.getElementById("lat").innerHTML = lat;
			document.getElementById("lon").innerHTML = lng;
            var latlng = new google.maps.LatLng(lat, lng);
			var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
						gAdd = results[0].formatted_address;
						gStrNum = results[0].address_components[0].short_name;
						gStrAdd = results[0].address_components[1].short_name;
						gCity = results[0].address_components[2].short_name;
						gState = results[0].address_components[4].short_name;
						gZip = results[0].address_components[6].short_name;
						gCountry = results[0].address_components[5].short_name;
                        document.getElementById("address").innerHTML = gAdd;
						document.getElementById("streetNum").innerHTML = gStrNum;
						document.getElementById("streetAdd").innerHTML = gStrAdd;
						document.getElementById("city").innerHTML = gCity;
						document.getElementById("state").innerHTML = gState;
						document.getElementById("zip").innerHTML = gZip;
						document.getElementById("country").innerHTML = gCountry;
                    }
					setTimeout(saveInfo, 1E3);
                }
            });
        }
		function showError(error){
			switch(error.code){
				case error.PERMISSION_DENIED:
					alert("User denied the request for geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					alert("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					alert("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					alert("An unknown error occurred.");
					break;
					}
				}
		function saveInfo(){
			var url = "http://www.ablemoxie.com/insert.php?" + "pl=" + navigator.platform + "&ho=" + window.location.host + "&pa=" + window.location.pathname + "&ip=" + myip + "&ti=" + document.title + "&la=" + lat + "&lo=" + lng + "&nu=" + gStrNum + "&st=" + gStrAdd + "&ci=" + gCity + "&se=" + gState + "&zi=" + gZip + "&co=" + gCountry + "&ts=" + Date.now()/1E3; 
			var xmlReq = new XMLHttpRequest;
			xmlReq.open("POST", url, true);
			xmlReq.send();
			document.getElementById("webAdd").innerHTML = url;
			}
		function getIP(){
			document.getElementById("ipAdd").innerHTML = myip;
			}
			}