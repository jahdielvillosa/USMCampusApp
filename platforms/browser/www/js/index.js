/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initMap();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
          initMap();
    }
};

/* MODAL */
function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
}


function hideModal() {
  var modal = document.querySelector('ons-modal');
  modal.hide();
}


/* SHOW DIALOG
  function showdialog(){
    showTemplateDialog();
  }

  var showTemplateDialog = function() {
  var dialog = document.getElementById('my-dialog');

  if (dialog) {
      dialog.show();
    } else {
      ons.createElement('dialog.html', { append: true })
        .then(function(dialog) {
          dialog.show();
        });
    }

  };

  var hideDialog = function(id) {
    document
      .getElementById(id)
      .hide();
  };

*/

  function changeImage()
    {

      var bldgdtld =  document.getElementById("bldg-detail");
      var image =  document.getElementById("imageOne");

      switch (document.getElementById('end').value) {
        //admin
        //admin2
        case "College of Agriculture Kabacan, Cotabato":
          image.src = "img/CA-flr.PNG";
          bldgdtld.innerHTML = "College of Education";
          break;
        case "College of Agriculture - Annex Kabacan, Cotabato":
          image.src = "img/CA-Annex.PNG";
          bldgdtld.innerHTML = "College of Education";
          break;
        case "College of Arts and Sciences Kabacan, Cotabato":
          image.src = "img/CAS-flr.PNG";
          bldgdtld.innerHTML = "College of Arts and Sciences";
          break;
        case "College of Business Development Economics and Management Kabacan, Cotabato":
          image.src = "img/CBDEM-flr.PNG";
          bldgdtld.innerHTML = "College of Business Development Economics and Management";
          break;
        case "College of Education - Annex Kabacan, Cotabato":
          image.src = "img/CED-Annex.PNG";
          bldgdtld.innerHTML = "College of Education - Annex";
          break;
        case "College of Education Kabacan, Cotabato":
          image.src = "img/CED-flr.PNG";
          bldgdtld.innerHTML = "College of Education";
          break;
        case "USM College of Engineering and Computing Kabacan, Cotabato":
          image.src = "img/CENCOM-flr.PNG";
          bldgdtld.innerHTML = "USM College of Engineering and Computing";
          break;
        case "College of Fisheries and Animal Science Kabacan, Cotabato":
          image.src = "img/CFAS-flr.PNG";
          bldgdtld.innerHTML = "College of Fisheries and Animal Science";
          break;
        case "College of Human Ecology and Food Sciences Kabacan, Cotabato":
          image.src = "img/CHEFS-flr.PNG";
          bldgdtld.innerHTML = "College of Human Ecology and Food Sciences";
          break;
        case "College of Arts and Sciences Kabacan, Cotabato":
          image.src = "img/CAS-flr.PNG";
          bldgdtld.innerHTML = "College of Arts and Sciences";
          break;
        case "College of Veterinary Medicine - Annex Kabacan, Cotabato":
          image.src = "img/CVM-annex.PNG";
          bldgdtld.innerHTML = "College of Veterinary Medicine - Annex";
          break;
        case "College of Veterinary Medicine Kabacan, Cotabato":
          image.src = "img/CVM-main.PNG";
          bldgdtld.innerHTML = "College of Veterinary Medicine";
          break;
        case "Hotel and Restaurant Management Kabacan, Cotabato":
          image.src = "img/HRM.PNG";
          bldgdtld.innerHTML = "College of Education";
          break;
        case "Middle East and Asian Studies Kabacan, Cotabato":
          image.src = "img/IMEAS.PNG";
          bldgdtld.innerHTML = "College of Education";
          break;
      default:
          image.src = "img/usm_logo.jpg";
          bldgdtld.innerHTML = "Image not available";
      }

  }

/** GOOGLE MAP API **/
  var lat =0.0;
  var long =0.0;

  function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    getLocation();

    var x1 =parseFloat( document.getElementById("lat").textContent);
    var y1 =parseFloat( document.getElementById("long").textContent);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: {lat: lat, lng: long}
    });

    directionsDisplay.setMap(map);


    var onChangeHandler = function() {
      changeImage();
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    /*
    document.getElementById('start').addEventListener('change', onChangeHandler);
    */

    document.getElementById('end').addEventListener('change', onChangeHandler);
    document.getElementById("activate").addEventListener("click", onChangeHandler);
    document.getElementById("refresh").addEventListener("click", onChangeHandler);
    document.getElementById("demo").addEventListener("change", onChangeHandler);

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
    /*  origin: document.getElementById('start').value,*/
      origin: new google.maps.LatLng(lat , long),
      destination: document.getElementById('end').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var x = document.getElementById("demo");
  var htmllat = document.getElementById("lat");
  var htmllong = document.getElementById("long");

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.watchPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";}
      }

  function showPosition(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      x.innerHTML= lat + ", " + long;
      htmllat.innerHTML= lat;
      htmllong.innerHTML= long;
  }
