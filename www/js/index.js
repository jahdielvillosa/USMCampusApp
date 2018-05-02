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



  function changeImage()
    {

      var bldgdtld =  document.getElementById("bldg-detail");
      var image =  document.getElementById("imageOne");

      switch (document.getElementById('end').value) {
        //admin
        //admin2
        case "College of Agriculture Kabacan, Cotabato":
          image.src = "img/CA-flr.PNG";
          bldgdtld.innerHTML = "College of Agriculture";
          break;
        case "College of Agriculture - Annex Kabacan, Cotabato":
          image.src = "img/CA-Annex.PNG";
          bldgdtld.innerHTML = "College of Agriculture";
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
          bldgdtld.innerHTML = "College of Restuarant Management";
          break;
        case "Middle East and Asian Studies Kabacan, Cotabato":
          image.src = "img/IMEAS.PNG";
          bldgdtld.innerHTML = "Institute of Middle East and Asian Studies";
          break;
      default:
          image.src = "";
          bldgdtld.innerHTML = "Image not available";
      }

  }

/** GOOGLE MAP API **/
  var lat =0.0;
  var long =0.0;
  var map;

  function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    getLocation();

    var x1 =parseFloat( document.getElementById("lat").textContent);
    var y1 =parseFloat( document.getElementById("long").textContent);
    if(lat==0 && long == 0){
      lat=7.113195;
      long= 124.831542;
    }

   map = new google.maps.Map(document.getElementById('map'), {
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
    setMarker(map,lat,long);
    setMarker(map,document.getElementById('end').value);
  }

  function setMarker(map,marklat,makrlong){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(marklat,makrlong),
      map: map
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

  function hidedesc(){
      var p3 = document.getElementById('page3');
      p3.style.display = "none";
      p3.style.zIndex = 1000;
  }

  function showdesc(){
    var p3 = document.getElementById('page3');
    p3.style.display = "inline";
    p3.style.zIndex = 1000;

    var title1 =  document.getElementById("desc-title1");
    var p1 =  document.getElementById("desc-p1");
    var image1 =  document.getElementById("desc-image");

    switch (document.getElementById('end').value) {
            //admin
              case "College of Arts and Sciences Kabacan, Cotabato":
                image1.src = "img/CAS.png";
                title1.innerHTML = "College of Arts and Sciences";
                p1.innerHTML =
                "<p>The College of Arts and Sciences had its beginning in 1956 as the General Education Department (GED) mandated to respond to the needs of each student for a “broad general education that will assist each individual to develop his full potential as a human being’. Its first unit head was Dr. Donato B. Pableo from 1956 until he retired on October 21, 1974.</p>"+
                "<p>On October 22, 1974, the GED was headed by Prof. Filomena C. Antonio until her retirement in 1977. The GED branched-out into two departments, namely: the Education Department headed by Prof. Sergio Ramos, and the Languages and Sciences Department which became the nucleus of CAS headed by Prof. Librada C. Pableo from 1977 until her retirement in 1987.</p>"+
                  "<p>On March 13, 1978, MIT became a University. The department was converted into a college, the College of Arts and Sciences. Its first dean was Dr. Librada C. Pableo. With its conversion were the two degrees namely, Bachelor of Science in Biology and Bachelor of Science in Chemistry. Two years later, in June 1980, the Development Communication major of the Bachelor of Science in Agriculture from the College of Agriculture was transferred to CAS and became the Department of Development Communication. In June 1983, the Mathematics, Statistics and Physics departments were also transferred from the College of Engineering to CAS.</p>"+
                "<p>Dr. Rose Marie Bugarin came next as the Dean of CAS from 1987 to 1992. She was the second dean of the college. However, she went to USA for her post-doctoral on Environmental Studies in August 1989, Dr. Prisciliano T. Bauzon was appointed Officer-in-Charge from August 19989-Ausgust 1990. Upon returning to USM, Dr, Bugarin resumed leadership of the College from September 1990 to 1992. It was also during her leadership that the Regional Science Training Center (RSTC) was established. Then she was designated as Director of the newly established Philippine Rubber Testing Center (PRTC).</p>"+
                "<p>Prof. Ana L. Tomen was appointed Officer-in-Charge from April 1992 to June 30, 1992 and became the third dean of the College on July 1, 1992 up to her retirement on March 30, 1996. In 1994, the Physics Department was separated from the Mathematics, Statistics and Physics Department. In June 1995, a new degree program, Bachelor of Science in Agricultural Chemistry was offered. Upon the retirement of Dr. Tomen, Dr. Nicanora S. Sorrosa became the Officer-in-Charge from April 1, 1996 to June 30, 1996. She was concurrently the Director of the Regional Science Training Center (RSTC) at USM.</p>"+
                "<p>Dr. Grace G. Lopez became the fourth dean of the College from July 1, 1996 to July 21, 2002. She was designated as Supervisor of the newly established Child Care Center and at the same time the Deputy Director for Research of the University. Through the initiative of the Behavioral Sciences Department Chairperson, Dr. Prisciliano T. Bauzon, the USM Teen Center was established in 1998. The center serves and functions as a youth organization, which aims to improve and promote the total well-being of the youth.</p>"+
                "<p>A new course offering, Bachelor of Arts in Psychology came into being in June 1997under the Department of Behavioral Sciences. In the same year, two new graduate courses: MS Biology and MA Mathematics were also offered. These graduate courses with already existing MS Development Communication and MAT Biology were given back by the Graduate College to CAS for coordination. In November 2000, another graduate course was offered, MA in Language Teaching (MALT) under the Department of English Language and Literature.The 14-month crash course program on Accelerated Integrated Teacher Training on Cultural Communities (AITTCC) was offered on October 20, 1999 to December 20, 2000. It was designed to provide an accelerated teacher training to qualified dependents of rebel returnees with the Southern Development Authority as funding agency.</p>"+
                "<p>The changing educational environment called for undergoing the accreditation process, which the College had undergone Level I accreditation on November 8-10, 1996 and Level II on September 23-25, 1998. The College continues to operate in the direction of AACCUP standards to pursue quality education. It was also guided and inspired by the vision and mission of the University from which the goals of the College emanates.The updating of the College to meet the standard is a tedious process. A consultancy visit was done on July 19, 2001 to assess and find out how far the College had complied with the accreditors recommendations and its readiness for resurvey. The first resurvey was done last November 21-23, 2001.</p>"+
                "<p>On July 26, 2002, there was a turn-over ceremony of the CAS leadership to Dr. Anita B. Tacardon, the fifth CAS Dean, to effect on August 1, 2002. The challenge to meet the standards of a quality college in accordance with the AACCUP criteria is the focus of the preparations for the second resurvey in 2006.A tremendous face lifting of the 25-year old CAS building was made. Classrooms, laboratory rooms, comfort rooms, spacious offices were constructed, renovated and improved. Additional facilities were acquired to serve the interest of the students, e.g. drinking fountains, well-ventilated classrooms, well- equipped audio visual room, student park, and sports area, among others.</p>"+
                "<p>USM is privileged to have been chosen by CHED to implement the Expanded Tertiary Educational Equivalency Accreditation Program (ETEEAP). The college proposed the BS DevCom under this program and was endorsed by the Academic Council in September 2003 to the Board of Regents which the latter approved. This is to cater the primarily to non-degree holders who are already practitioners but cannot compete for promotion in their workplace.In the same year, the Social Action Center for Community Services and Development (SACCSCD) was also created. The center was conceived through the efforts of Dr. Antonio N. Tacardon as its first and current Executive Director. It was established mainly to promote active and lasting social involvement of the professors and technical experts of the University in community development.</p>"+
                "<p>Concomitantly, the notable demand for nurses in the international market posed a challenge to the College to consider the possibility of offering the nursing course. The global phenomenon compelled Dr. Anita B. Tacardon to initiate the nursing program to address the local need for a quality nursing school in the area. On December 12, 2003, the BOR gave CAS the blessing to offer BS Nursing, a self-liquidating program with fees different from that of existing regular program. It was duly approved on February 17, 2004 and started to open its eight sections (397 students) last June 2004.</p>"+

                "<p>The National Telecommunication Company (NTC) assigned the call letters DXKA-FM with the frequency of 93.3MHz. A month-long test broadcast was done which started last June 28, 2006, to ensure the span of coverage and the fine-tuning of signal transmission. It was finally launched and inaugurated last July 18, 2006 with Allan C. Facurib as designated Station Manager. At present, Dr. Anita B. Tacardon was designated as the Station Manager. The DXKA-FM was eventually renamed as DXVL-FM with the frequency of 94.9MHz.In June 2009-2010, Dr. Nelson M. Belgira assumed leadership as the sixth Dean of the College. In 2010 to present, Dr. Evangeline A. Tangonan serves as the 7th Dean of the College.</p>"+
                "<p>In June 2011, the CAS obtained BOR approval, upon the recommendation of CHED XII the offering of new courses: BS Criminology, now under a separate department of the college and BS Pharmacy under the College of Health Sciences. This is due to the efforts of the faculty of the Department of Social Science and Philosophy and Department of Chemistry respectively under the leadership of Dr. Evangeline A. Tangonan.</p>"+
                "<p>In 2012, the Department of Biological Sciences through the assistance of Department of Environment and Natural Resources XII established the USM Biodiversity, a focal point for bio-environmental researches. The department was also a recipient of 5 million research grant from DOST-PCAARRD on Goat Production and 4.3 million for herbs and spices research. Together with the Department of Chemistry and Department of English Language and Literature, a 21 million research grant from DOST-PCIEERD was granted for Science and Technology Program for Responsible Mining in Mindanao.</p>"+
                "<p>In October 2013, the BS Development Communication and AB Psychology submitted for Phase II Level III accreditation by AACUP. The BS Biology program was evaluated for Level IV while AB English, AB Political Science and Bachelor of Library and Information Science were subjected to preliminary survey.CAS being a service college of the University was awarded by CHED a two-story building for classroom.</p>"+
                "<p></p>"+

                "<h3>Vision</h3>"+
                "<p>Excellence in the Arts and Sciences</p>"+

                "<h3>Mission</h3>"+
                "<p>Empowerment of faculty and students through quality education.</p>"+

                "<h3>Goal</h3>"+
                "<p>The College of Arts and Sciences pursues the development of well-rounded persons through a culture of excellence in the arts and sciences for the establishment of a just and humane society.</p>"+

                "<h3>Objectives</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>1.	To develop the intellectual capabilities, skills and right attitude of students in the arts and sciences for them to be globally competitive.</li>"+
                "<li>2.	To develop critical awareness and appreciation of the cultural, scientific, and technological advancements to bridge the gap among cultural communities.</li>"+
                "<li>3.	To undertake researches in the arts and sciences for curricular enrichment, community empowerment, and human development; and</li>"+
                "<li>4.	To create and strengthen linkages, collaborative efforts, and networking for the enhancement of programs in instruction, research, extension, and resource generation.</li>"+

                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>BACHELOR OF SCIENCE IN BIOLOGY </li>"+
                "<li>BACHELOR OF SCIENCE IN CHEMISTRY/ AGRICULTURAL CHEMISTRY </li>"+
                "<li>BACHELOR OF SCIENCE IN DEVELOPMENT COMMUNICATION </li>"+
                "<li>BACHELOR OF ARTS IN ENGLISH  </li>"+
                "<li>BACHELOR OF ARTS IN POLITICAL SCIENCE </li>"+
                "<li>BACHELOR OF ARTS IN PSYCHOLOGY </li>"+
                "<li>BACHELOR OF SCIENCE IN CRIMINOLOGY </li>"+
                "</ul>"+
                "<p></p>"+
                "<p></p>";


                break;
            case "College of Agriculture Kabacan, Cotabato":
            case "College of Agriculture - Annex Kabacan, Cotabato":
              image1.src = "img/CA.png";
              title1.innerHTML = "College of Agriculture";
              p1.innerHTML =
                "The former Mindanao Institute of Technology, now the University of Southern Mindanao, was established in 1952 and started to offer the Bachelor of Science in Agriculture degree in 1954 – 1955. In 1959, the late President Dominador D. Clemente approved the establishment of the Department of Agricultural Education with the late Prof. Crisostomo M. Marasigan, as its first head."+
                "In 1976, the department became the College of Agriculture (CA) two years before the Mindanao Institute of Technology was converted into the University of Southern Mindanao in March 13, 1978. At present, the CA offers four BS degree programs: Bachelor of Science in Agriculture (BSA), Bachelor of Science in Farming Systems (BSFS), Bachelor of Science in Animal Husbandry (BSAH) and Bachelor of Science in Fisheries (BSF). It is composed of eleven (11) departments, namely;"+
                " Department of Agricultural Extension, Agronomy, Animal Science, Entomology, Farming Systems, Horticulture, Plant Breeding and Genetics, Plant Pathology, Soil Science, Fisheries, General Agriculture I and II."+
                "The College is headed by the College Dean and assisted by 11 Department Chairpersons, 28 College Coordinators and six (6) support personnels in the implementation of its vision / mission, goals and objectives."+
                "<p>The College of Agriculture as the mother unit gave birth to the creation of other colleges: the College of Engineering now College of Engineering and Computing from its Department of Agricultural Engineering; College of Business Development Economics and Management from its Department of Agricultural Economics; the College of Veterinary Medicine from its Department of Veterinary Medicine; and the College of Fisheries and Animal Sciences from its Department of Animal Science."+
                "On its journey towards attaining and maintaining a culture of academic excellence and relevance in tertiary education, the CA had been led by brilliant men and women at its helm, to wit: Prof. Crisostomo M. Marasigan, Drs. Kadil P. Sinolinding, Anacleto M. Pedrosa Jr., Kundo E. Pahm, Virgilio G. Oliva, Teofilo C. dela Cruz, Pio A. Elevazo, Eugenio A. Alcala, Abraham G. Castillo, Naomi G. Tangonan, Ariston D. Calvo, Nicolas A. Turnos, Edna M. Jover, Conrado C. Evangelista and "+
                "Adeflor G. Garcia, the current dean.The College was accredited by AACCUP with Level 1 status on November 18, 1996, Level II on September 23, 1998, Level II Reaccredited Status on November 21, 2001, and Level III, Phase I on November 29, 2006 and Phase II in January 2007. Moreover, the College was also designated in 1997 as the Nodal Center for the Mindanao Advanced Education Programs (MAEP) in Agriculture and as one of the six Centers of Excellence (COE) in Agriculture Education throughout"+
                " the country by CHED in February 1999.The pool of research scientist in the College of Agriculture has been recognized by the Philippine Agriculture and Resources Research Foundation, Inc. (PARRFI), hence Professorial Chairs and Scholarship are regularly awarded. For the Professorial Chair holders, this was commenced when Dr. Naomi G. Tangonan was awarded in 2001. The following are other PARRFI Professorial Chair holders in the College: Dr. Ariston D. Calvo (2002),"+
                " Dr. Romulo L. Cena (2003), Dr. Demetrio V. Oria (2004), Dr. Conrado C. Evangelista (2005); Dr. Purificacion O. Cahatian (2006); Dr. Adeflor G. Garcia (2007); Dr. Baudilla S. Calvo and Dr. Jaime C. Silvestre (2008); Dr. Raquel B. Evangelista (2009); Dr. Emma K. Sales (2010); Dr. Edna M. Jover (2011).</p><p>The College has been previously awarded as one of the National Agriculture under the National Universities in Agriculture and Fisheries Education System (NAFES) on October 2009 "+
                "and Center of Development in BS Agriculture on February 27, 2009.</p>"+
                "<h3>Goals</h3>"+
                "<p>The College of Agriculture assumes a prime role in pursuing a culture of excellence in agricultural instruction, research, extension and production activities.  It endeavors to train morally upright men and women who will be leaders in various fields of agricultural education, science and technology.</p>"+
                "<h3>Objectives</h3>"+
                "<p>The general objective of the College of Agriculture is to produce graduates who are locally and globally competitive; develop or train manpower resources who will provide moral leadership in the socio – economic and agri–industrial development of Southern Philippines, in support of national development endeavors.</p>"+
               "Specifically, the CA aims to:"+
                "<ul style='list-style-type:none'><li>1.	produce graduates who are:</li>"+
                "<li>a.	well – trained and skilled in the production and management of all kinds of crops (cereals, legumes, fruits, plantation vegetables, ornamentals, etc.) as well as animal industry</li>"+
                "<li>b.	competent agricultural extensionist</li>"+
                "<li>c.	experts in the management of insect pests, diseases, weeds and farming systems</li>"+
                "<li>d.	skilled in plant breeding and tissue culture</li>"+
                "<li>e.	equipped with computer skills</li>"+
                "<li>f.	proficient in soil analysis and management</li>"+
                "<li>g.	proficient in communication skills</li>"+
                "<li>h.	equipped with excellent entrepreneurial capabilities</li>"+
                "<li>2.	adopt a culture of academic excellence in agricultural sciences and other related fields through active participation of faculty members and students in conducting basic and applied researches; and</li>"+
                "<li>3.	participate actively in the extension of developed technologies to target clienteles through trainings, workshops and seminars.</li></ul>"+

                "<h3>Courses Offered</h3>"+
                "<h3>BACHELOR OF SCIENCE IN AGRICULTURE </h3>"+
                "<p>The BS in Agriculture (BSA) program aims to train the students for the scientific practice of thought and to prepare them to become professionals with entry level competencies in technical and hands-on agriculture.  The program emphasizes the processes and techniques of identifying, diagnosing, and analyzing problems and in designing, packaging, and applying technologies needed in the development and conservation of the agriculture and food system resources.</p>"+
                "<p>In USM, the BS in Agriculture has the following Major and Specializations:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>a.	Agricultural Extension</li>"+
                "<li>b.	Agronomy</li>"+
                "<li>c.	Animal Science</li>"+
                "<li>d.	Entomology</li>"+
                "<li>e.	Horticulture</li>"+
                "<li>f.	Plant Breeding and Genetics</li>"+
                "<li>g.	Plant Pathology</li>"+
                "<li>h.	Soil Science</li>"+
                "<li>i.	Organic Agriculture</li></ul>"+
                "<h3>BACHELOR OF SCIENCE IN FARMING SYSTEM  </h3>"+
                "<h3>BACHELOR OF SCIENCE IN FISHERIES  </h3>"+
                "<p>The BS Fisheries program is a four-year course program that aims to provide the students with academic discipline of managing and understanding fisheries. It is a multidisciplinary science, which draws on the disciplines of aquaculture including breeding, genetics, biotechnology, nutrition, farming, diagnosis of diseases in fishes, other aquatic resources, medical treatment of aquatic animals; fish processing including curing, canning, freezing, value addition, byproducts and waste utilization, quality assurance and certification, fisheries microbiology, fisheries biochemistry; fisheries resource management including biology, anatomy, taxonomy, physiology, population dynamics; fisheries environment including oceanography, limnology, ecology, biodiversity, aquatic pollution; fishing technology including gear and craft engineering, navigation and seamanship, marine engines; fisheries economics and management and fisheries extension.</p>"+
                "<h3>BACHELOR OF SCIENCE IN PRACTICAL AGRICULTURE  </h3>"+
                "<h3>SHORT COURSES OFFERED    </h3>"+
                "<p>j.	Halal Live Stock and Poultry Production – 1 year</p>"+
                "<p>k.	Oil Palm Production Technology – 6moths / 1 year</p>"+
                "<p>l.	Plantation Crops Production and Management – 1 year</p>"+
                "<p>m.	Rubber Technology – 6 month</p>"+
                "<p></p>"+
                "<p></p>";

              break;

            case "7.119205, 124.827489":
            case "7.120427, 124.828457":
            case "7.119545, 124.828478":
            case "7.118721, 124.828388":
              image1.src = "img/CTI.png";
              title1.innerHTML = "College of Trades and Industries";
              p1.innerHTML = "<p>In response to the program of industrialization in Central Mindanao, the Mindanao Institute of Technology (MIT) opened the Trade and Industrial Education Department (TIED) on August 1, 1958 with Prof. Jack Smith as its department head. TIED aimed to answer the manpower needs and help in the attainment of the nation’s goals for socio-economic development.</p>"+
                "<p>In 1961, three curricula were opened namely: (1) the secondary trade curriculum; (2) the two-year technical trade curriculum; and (3) the teacher education curriculum leading to the degree of Bachelor of Science in Industrial Education (BSIEd).</p>"+
                "<p>The post-secondary Technical Trade Curriculum (TTC) was intended to prepare industrial technicians and skilled workers who will qualify for employment in industry or be self-employed. The BSIEd was intended to prepare shop teachers in elementary, secondary and collegiate schools, and was designed to prepare the individual to become professional teachers, competent shop managers or supervisors</p>"+
                "<p>Both TTC and BSIEd students chose one major field of specialization in any of the following: automotive, building construction, drafting, electrical, electronics, machine shop and wood technologies, and industrial arts. The first batch of graduates of BSIEd was in 1965, and Prof. TEOFILO C. OBONGEN was the first cum laude in 1966.</p>"+
                "<p>Dr. FEDESERIO CAMARAO followed the leadership of TIED from 1965-1969. Then Prof. JAIME MARQUEZ from 1969-1976. Dr. FEDESERIO CAMARAO returned as the department head from 1976-1979. Prof. PEDRO JAIME from 1979-1982 became its first College Dean when TIED became the College of Trades and Industries (CTI) due to the conversion of MIT into the University of Southern Mindanao (USM) by virtue of PD 1312 on March 13, 1978.</p>"+
                "<p>During the leadership of Prof. ERNESTO I. BUENAVENTURA from 1982-1985, industrial arts which was once a major field in BSIEd was converted into a degree leading to Bachelor of Science in Industrial Arts (BSIA) in 1983. This degree program was intended to prepare prospective teachers of work education in the elementary schools and practical arts teachers in the general high schools. It includes a broad study of the industrial world. Students underwent one major field per semester which covers woodworking, metalworking, electricity, home industries, graphic arts, general agriculture and ceramics technology.</p>"+
                "<p>Along with the offering of BSIA in 1983 was the opening of the ladderized Bachelor of Science in Industrial Technology (BSIT) which has the same major fields of specialization as BSIEd; and the one-year Special Trade Course (STC) with concentration in automotive mechanics, lathe machine operation, practical electricity, radio mechanics, technical drafting, welding and fabrication and general carpentry. In 1999, refrigeration and air conditioning (RAC) and computer servicing were also offered.</p>"+
                "<p>Dr. SERAFIN T. DEPAKAKIBO was the dean from 1985-1988 followed by Dr. GAVINO D. BAUTISTA from 1988-1991 whose untimely death led to Prof. ELMER C. BASILLA’s takeover from 1991 until his retirement in 1998. Dr. WILFREDO L. DOONG became the last CTI dean from 1998-2003 due to its conversion as Department of Technology (DT). This was brought about by the conversion of the then North Cotabato College of Arts and Trades (NCCAT) in Sudapin, Kidapawan City as an external campus of USM which become the College of Industry and Technology (CIT); and the Department of Technology (DT) became its external department/unit. The DT eventually becomes the Department of Industrial Technology (DIT).</p>"+
                "<p>The BSIA, BSIEd and BSIT passed the Level 1 accreditation of the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP) in 1998. However, due to the conversion of CTI into DIT and some issues with the College of Education, BSIA and BSIEd were frozen/stopped accepting freshmen. This is also true with BS Home Economics and BS Agricultural Education.</p>"+
                "<p>Dr. PALASIG U. AMPANG became the first dean of CIT in 2003. He was followed by Dr. ROGELIO S. TABORA (2004-2005), Dr. RUFINO S. GARZON (2005-2010), Dr. RENE V. HANDOC (2010-2011), Dr. HERMINIGILDO T. GUTIERREZ (2011-2013), Prof. ALFREDO E. NAPARAN (2013-2014), Dr. LUZ A. TAPOSOK (2014-2015) and finally Dr. RONIELYN PINGSOY (2015-present).</p>"+
                "<p>In 2008, the BSIT program was awarded the Level 2 Reaccredited Status by AACCUP. And in November 29, 2014, the BSIT program was awarded Level 3 Phase 1.</p>"+
                "<p>In 2011, the DIT re-opened the offering of BSIEd renaming it into the Bachelor of Technical Teacher Education (BTTE) as per CHED memo no. 56, s.2007. This is in answer to the great demand for technical teachers in the implementation of the K-12 program of the national government. BTTE graduates can also be employed as professional teachers in technical schools, assessors, technologists, industrial entrepreneurs and specialists locally and overseas.</p>"+
                "<p>DIT also offers short-term courses like defensive driving, industrial motor controls, etc.</p>"+
                "<p>DIT on approaching its sixth decade of academic service will continue to evolve and provide quality and relevant knowledge and skills to attain the vision and mission of the University of Southern Mindanao.</p>"+
                "<p>HISTORICAL DEVELOPMENT OF THE DEPARTMENT OF INDUSTRIAL TECHNOLOGY By: RUTH C. SABINAY, EdD</p>"+

                "<h3>Goals</h3>"+
                "<p>The College of Agriculture assumes a prime role in pursuing a culture of excellence in agricultural instruction, research, extension and production activities.  It endeavors to train morally upright men and women who will be leaders in various fields of agricultural education, science and technology. </p>"+
                "<h3>Objectives</h3>"+
                "<p>Department Goals</p>"+
                "<p>The Department of Industrial Technology of the College of Industry and Technology aims to provide quality and relevant technology education and skills training in the fields of specialization to meet the needs for skilled manpower. BSIT Goals At the end of the program, a graduate is expected to:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>1. Compete globally as efficient technologists and technicians </li>"+
                "<li>2. Conduct researches, trainings and entrepreneurship in their specialized fields; </li>"+
                "<li>3. Manifest culture sensitivity, moral and ethical responsiveness in industrial and entrepreneurial professions. </li>"+
                "<li> </li>"+
                "</ul>"+
                "<p>BTTE Goals</p>"+
                "<p>At the end of the program, a graduate is expected to:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>1. Facilitate efficiently the learning in technology education; </li>"+
                "<li>2. Conduct trainings, researches, extensions and resource generations in technology education and industries;</li>"+
                "<li>3. Manifest culture sensitivity, moral and ethical responsiveness in teaching, technical and entrepreneurial professions. </li>"+
                "<li> </li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<p>Bachelor of Science in Industrial Technology (BSIT)</p>"+

                "<ul style='list-style-type:none'>"+
                "<li>•	Automotive Technology</li>"+
                "<li>•	Automotive Technology</li>"+
                "<li>•	Electrical Technology</li>"+
                "<li>•	Electronics Technology</li>"+
                "</ul>"+

                "<p>1-year Special Trade Course (STC)</p>"+
                "<p>Short-Term Courses</p>"+

                "<ul style='list-style-type:none'>"+
                "<li>•	Defensive Driving</li>"+
                "<li>•	Industrial Motor Controls</li>"+
                "</ul>"+

                "<p></p>"+
                "<p></p>";
              break;

            case "College of Business Development Economics and Management Kabacan, Cotabato":
              image1.src = "img/CBDEM.png";
              title1.innerHTML = "College of Business Development Economics and Management ";
              p1.innerHTML = "<p>The College of Business, Development Economics and Management of the University of Southern Mindanao (CBDEM-USM) was known before as the Institute of Development Economics and Management (IDEM) since it was separated from its mother college the College of Agriculture on December 10, 1992. IDEM was converted into CBDEM through BOR Resolution # 9, series of 2008. Behind is a social mission to have a curricular offering hasten the socio-economic development in Central Mindanao by producing graduates who are equipped with knowledge, skills and attitude to render public services to realize strong, effective and efficient governance.</p>"+
                "<p>The College has five departments, namely: Department of Agribusiness, Department of Agricultural Economics, Department of Development Management, Department of Business Administration and the Department of Accountancy. It offers five baccalaureate programs include Bachelor of Science in Agribusiness, Bachelor of Science in Agricultural Economics, Bachelor of Science in Bachelor of Science in Development Management, Bachelor of Science in Business Administration, and the Bachelor of Science in Accountancy. The graduate offerings are Master of Science in Agricultural Economics (MS AgEcon), Master of Science in Rural Economic Development (MSRED), Master in Public Administration (MPA) and Doctor of Philosophy in Rural Development (PhD RD.</p>"+
                "<p>The College was known to have the highest enrolment in the campus. In terms of accreditation, there were 2 programs recently visited for Level III Phase I on BS Agribusiness and BS AgEcon. The BS in Development Management is on Level I status while BS Business Administration and BS Accountancy are on preliminary visit status.</p>"+
                "<pThere were 44 strong faculty members who are holders of relevant Master’s and Doctoral degrees. Of those faculty members, 8 were doctoral degree holders, 17 master’s degree holders and 19 were continuing their studies. Eighteen (18) faculty members were under Contract of Service (COS) and the rest were on permanent status. The admission requirements and policies which are adopted by the college were the same with those of the university.</p>"+
                "<p>The College has four (4) support staff of either contractual or pakyaw basis. One of them is a BS Degree holder with masters’ units while the rest are undergraduates. As to structure, the college has one (1) building which was partially renovated. It has 13 classrooms, 1 audio-visual room, 1 laboratory room and the rests are faculty offices and comfort rooms.</p>"+
                "<p>The research mandate of the College is manifested by having completed 2 faculty researches and 11 on-going researches funded by USM and external funds. There were also students’ researches during the period. There were 5 papers presented (2 international, 1 national and 2 in the local forum). The College is also undergoing tracer study for CBDEM graduates on the 5 programs.</p>"+
                "<p>The extension function of the College was materialized through its self-help initiative in collaboration with Local Student Government and Society of CBDEM in the implementation of projects in the adopted area of Dagupan, Kabacan, Cotabato. In addition to this activity, the college faculty members had serve as either as consultants, facilitators, coordinators or lecturers in their own fields of specialization.</p>"+
                "<p>Some of the faculty members were investors of the CBDEM Canteen which was operationalized by a private person. The AgEcon Department is a compiler and distributor of Econ 111 Workbook. The department also required 11 volumes of various economics and agri-economics related books through the donation of Mr. Quintin Balagot.</p>"+
                "<p>In 1014, the operation of the college was financed from its local funds (tuition and laboratory fees) and partly from the national government on the repair of the building. In order to improve the operation of the unit, it conducted meetings of faculty, staff together with student leaders of the different society organizations.</p>"+

                "<h3>Goals</h3>"+
                "<p>To produce competent and responsible professionals who will provide leadership in business, development, economics and management.</p>"+
                "<h3>Objectives</h3>"+
                "<p>The general objective of the College of Business Development and Economics Management is:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>1.	to develop the students’ entrepreneurial, managerial and leadership skills with high sense of integrity;</li>"+
                "<li>2.	to continually generate and impart knowledge, skills, attitudes and values to students;</li>"+
                "<li>3.	to disseminate the generated knowledge, skills and technologies in the service areas through collaboration with government and non-government organizations;</li>"+
                "<li>4.	to establish and operationalize income generation activities in order to augment the limited resources;</li>"+
                "<li>5.	to continually train students, who will in turn become trainers to contribute for the development in the community.</li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>Bachelor of Science in Agribusiness</li>"+
                "<li>Bachelor of Science in Agricultural Economics</li>"+
                "<li>Bachelor of Science in Bachelor of Science in Development Management</li>"+
                "<li>Bachelor of Science in Business Administration</li>"+
                "<li>Bachelor of Science in Accountancy</li>"+
                "</ul>"+

                "<p></p>"+
                "<p></p>";

              break;
            case "College of Education - Annex Kabacan, Cotabato":
            case "College of Education Kabacan, Cotabato":
              image1.src = "img/CED.png";
              title1.innerHTML = "College of College of Education ";
              p1.innerHTML =
                "<p>The Kabacan Provincial High School was converted to Mindanao Institute of Technology (MIT) on June 20, 1952 as stipulated in RA No. 763 duly signed into law by Elpidio Quirino .</p>"+
                "<p>Pres. Ramon Magsaysay appointed Prof. Emeterio A. Asinas of Central Luzon Agricultural College, now CLSU, as the first MIT President on August 19, 1954. MIT had two departments: the College Department and the High School Department. The College Department was composed of two sections: Agriculture and Home Economics. In 1956 these sections became departments with the addition of the Department of Trade and Industrial Education.</p>"+
                "<p>It was Atty. Nunggo E. Pahm the Registrar 1 of the MIT who pushed for the offering of Bachelor of Science in Elementary Education under the General Education Department which was established in 1956 with Dr. Donato B. Pableo. In SY 1961-1962, BSEED opened with fifty-five (55) first year students. Before the first batch of graduates of forty-two (42) students marched on June 5,1965, the status of the department was elevated to the Teacher Education Division. On February 15,1968- September 9, 1975, Prof. Sergio H. Ramos was designated as the first Division Head.</p>"+
                "<p>Prof. Serafin T. Depakakibo took over the leadership of the Division at Prof. Ramos retirement and he converted Teacher Education Division to the College of Education and Humanities. However, Prof. Depakakibo needed to leave for a doctoral program in USA.Consequently, on June 23, 1977, Prof.Francisca P.Molon was designated by the University President Dr. Jaman S. Imlan as the new dean as Prof. Serafin T. Depakakibo was leaving on scholarship for a doctoral program in the USA.</p>"+
                "<p>Prof. Molon introduced several innovations during her term, namely: the establishment of the CHRISLAM Elementary School at Lumayong in 1978; the transfer of humanities and behavioral science subjects to the College of Arts and Sciences; the conversion of the BSEEd to Bachelor of Elementary Education pursuant to BOR Res.No.42,s.1983 and the offering of Bachelor of Secondary Education (BSEd) pursuant to BOR Res. No.154,s. 1984. Apart from this, it may be mentioned that it was during Dean Molon’s tenure that the College of Education hopped from one building to another. Upon her assumption, the College was housed in Teacher Education Building, ARDEX, the building in front of the now USM Annex Elementary School. By 1980, the College transferred to the newly constructed College of Engineering Building. After this, the College moved to the University College Bldg. of the CAS in 1983. On July 9, 1989, Dean Molon retired.</p>"+
                "<p>The CED Associate Dean Dr. Maniaga P. Mantawil, the Datu of Kabacan and heir –apparent of the Sultan of Radja Buayan of the Royal House of Maguindanao, succeeded Dean Molon after his retirement on July 9, 1989 when the renovation of the College of Education was completed.</p>"+
                "<p>Dr. Mantawil was promoted as Director for Instruction on August 17, 1992, whereupon Dr. Abdul L. Gonsang, a seasoned DECS Administrator, the former Principal of the USM-Chrislam Elementary School at Lumayong, Kayaga, Kabacan and the Dean of the Middle East and Asian Studies (IMEAS) was designated by Pres. Pahm as the Dean of College of Education. In 1994 the College of Education was transferred to the newly renovated General Education Building renamed which was the College of Education building.</p>"+
                "<p>Dr. Florecita G. Tabora, the dean of the Graduate College took over the deanship of the College of Education on February 14, 2000 because Dr. Gonsang had to take a leave as he contracted tetanus. Dr. Tabora transformed the College of Education into what could be physically termed as “the glory that was the College of Education”. However, on May 25, 2003 while the college was preparing for AACCUP Third Level Accreditation, a conflagration razed the structure to the ground.</p>"+
                "<p>President Oliva sought the assistance of Hon. Emmylou “Lala” Talino-Santos, Representative of the 1st Legislative District of Cotabato Province and Regent of the USM Board of Regents. Consistent with her commitment to fully support the development efforts of the University, the Congresslady immediately directed her staff to earmark five million pesos (Php 5M) from her Priority Development Assistance Fund (PDAF) for the construction of a two –storey building for the College of Education of the University. Pres. Oliva proposed that the left wing be undertaken by the PDAF of 1st Legislative District Representative while the right wing shall be undertaken by the USM Administration.</p>"+
                "<p>Furthermore, Pres. Oliva started the realignment from the bottom with the designation of Dr. Antonio N. Tacardon as CED Dean on October 25, 2004. As the Dean, he led a workshop which gave a hard look into the organizational culture of the College in the light of the Vision-Mission-Goals of the University and the mandate Pres. Oliva gave him to accomplish, namely: the Third Level Accreditation of the College and the raising of the performance of the CED students in the Licensure Examination for Teachers. With the appointment of Dr. Tacardon as the Vice-President for the Academic Affairs of the university in 2010, the college then faced another challenge of having a new Dean in the person of Dr. Cosuelo A. Tagaro. Her leadership has continued the proposed construction of the Audio-Visual Room (still not yet completed as the present) and some other improvement in the college’s physical plant. Moreover, faculty trainings and seminars were also conducted.</p>"+
                "<p>It was half of the school year when there was a radical change in administrative offices including the College of Education. Dr. Tagaro was succeeded by Dr. Priscilla P. Costes who was then the director of the Academic Records Office. Dr. Costes wasn’t able to continue the second half of the deanship due to health condition. Consequently, Dr. Leorence C. Tandog from the Mathematics Department of the College of Arts and Sciences, was designated as the O.I.C Dean and later became appointed as the Dean of the College of Education.</p>"+
                "<p>As the Dean, a number of changes took place in the many areas in College. In her deanship, there were reconstruction in the college Admission and Retention Policies, LET Review Policies and Interventions and movements in the departments became significant also. From two departments, BEED and BSE, it became three with the addition of the Professional Education Department.</p>"+
                "<p>The college significant performances for the school year 2012-2013 are; a.) increased passing rate in Licensure Examination for Teachers (LET), b.) championed in Kaliline Festival for three consecutive years, c.) conducted a National Conferences (MTB-MLE), d.) established linkages (UP Diliman, Samar Institute for Linguistics), Save the Children International and e.)   acquired some equipment for the college.</p>"+
                "<p>Added to these accomplishments are the innovations, planning workshops and ongoing developments for the college instruction, research, extension and production as well as the physical feature furnishing of the College of Education.On June 16, 2014, Dr. Kautin S. Kulano was elected Dean of the College by virtue of an overwhelming mandate, as the turn for Dr. Tandog’s deanship came to an end. With Dean Kulano’s assumption as dean, the college has been infused and revitalized with dynamism as well as a new and promising outlook.</p>"+

                "<h3>Goals</h3>"+
                "<p>Provide leadership in teacher education in South Central Mindanao through quality, culture-sensitive, and value- oriented research and      instruction to prepare educational professionals recognized for innovative   teaching and community service.</p>"+
                "<h3>Objectives</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>1.	Develop academic, pedagogical, interpersonal, and leadership competencies necessary for effective teaching.</li>"+
                "<li>2.	Foster integrity, accountability, cultural identity, excellence through diversity, gender sensitivity, and interest for lifelong learning.</li>"+
                "<li>3.	Promote initiatives for the effective integration of technology into curriculum and instruction.</li>"+
                "<li>4.	Direct, enhance and expand educational programs to become more responsive toneeds of the diverse community.</li>"+
                "<li>5.	Develop and implement research-based teaching innovations that meet the demands for quality culture-and gender-sensitive education.</li>"+
                "<li>6.	Provide trainings to further the professional development of in-service teachers.</li>"+
                "<li>7.	Help improve quality of life of the marginalized through alternative modes of instruction.</li>"+
                "<li>8.	Harness and enhance the creative talents of the faculty and students toward productive educational endeavors.</li>"+

                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>•	Bachelor of Elementary Education</li>"+
                "<li>•	Bachelor of Secondary Education</li>"+
                "<li>	Major in:</li>"+
                "<li>		English</li>"+
                "<li>		Filipino</li>"+
                "<li>		Mathematics</li>"+
                "<li>	Biological Science </li>"+
                "<li>	Physical Education</li>"+
                "<li>	MAPEH (Music, Arts, Physical Education & Health)</li>"+
                "<li>	Social Studies</li>"+
                "<li>	Technology and Livelihood </li>"+

                "<li>•	Certificate in Professional Educational Courses ( CPEC )</li>"+
                "</ul>"+

                "<p></p>"+
                "<p></p>";

              break;
            case "USM College of Engineering and Computing Kabacan, Cotabato":
              image1.src = "img/CENCOM.png";
              title1.innerHTML = "College of Engineering and Computing  ";
              p1.innerHTML =
                "<p>The College has evolved from a Department of Agricultural Engineering into a College of Engineering when the Mindanao Institute of Technology was converted into a University on March 13, 1978. Bachelor of Science in Civil Engineering (BSCE) was offered in 1983 then followed with Bachelor of Science in Computer Science (BSCS), Bachelor of Science in Computer Engineering (BSCpE), and bachelor of Science in Information Science in Information Management (BSIM) were offered in 1997 and 2003, respectively. The College was renamed as College of Engineering and Computing (CENCOM). This occurred during the Deanship of Dr. Rommel G. Tangonan.</p>"+
                "<p>The pioneering program was the Bachelor of Science in Agricultural Engineering (BSAE). It was approved in principle during the 42nd meeting of the Board of Trustees of the Mindanao Institute of Technology held at Jade Vine Hotel, Manila on September 23, 1964. The first batch of the BSAE started in the School Year 1968-1969; however, the approval of which was only on December 13, 1968 during the 55th meeting of the Board of Trustees of the Mindanao Institute of Technology, held at Sunya Aristocrat Restaurant, Manila.</p>"+
                "<p>The Department of Agricultural Engineering was initially headed by Engineer Edilberto N. dela Torre, an electrical mechanical engineer in 1968. Due to his untimely death, the leadership of the department was passé on to Engr. Alfredo C. Pepito who stayed as chairman from April 1969 to May 1970. Engr. Benjamin F. Fortinez Sr. assumed the leadership of the department when Eng. Alfredo C. Pepito went on study leave on June 1970. When MIT became a university in 1978, Engr."+ "Fortinez became the first Dean of the College of Engineering. Eng Fortinez remained as a dean until May 1988. Dr. Eustaqui Bayotlang was designated as the next dean from June1988 to May 1995. Dr. Rufino S. Garzon next assumed the deanship from June 1995 until December 1998. Dr. Rommel Tangonan assumed the deanship from December 1998 to May 2009. Dr. Guttierez became the dean from June 2009 to October 2010. The current dean is Dr. Nelson M. Belgira who assumed the deanship of"+
                "of the College on November 2, 2010.</p>"+

                "<p>The college is committed to produce graduates of higher education in engineering and information technology education in this part of the country. Presently, the college has 6 degree programs: BSAE, BSCE, BSCpE, BSECE, BSCS, and BS Information System from 1973 up to the present. The College produces graduates who are leaders in their own right in different agencies, holding positions both in the government and the private agencies as chief executive officers, middle managers, and even successful managers of their own businesses. It has also produced a number of academicians, instructors, professors, vice presidents, PRESIDENT, deans in private and government institutions and the latest of who, is currently president of ASSCAT in Agusan del Sur, Dr. Virgilio Garcia. A number of our IT related graduates are working abroad as specialists in their fields.</p>"+
                "<p>From 1973 to 2003, the college has produced 26 topnotchers in the AE Licensure Examination. From 2003 upto the present, CENCOM has produced 10 Civil Engineering topnotchers. Although we are still below National passing in the AE Licensure examination, the percentage of passing has improved from 29% (2010) to 40% (2011) to 44.83% (2012). One measure to improve the passing rate was to let the graduates review at UP and MSU. Our graduates in their licensure examination did very well in the previous years.</p>"+
                "<p>In terms of Accreditation, the College has submitted degree programs to AACUP for accreditation. These are BS Agricultural Engineering (level III), BS Civil Engineering (level II), BS Computer Science (level I) , BS Computer Engineering and BS EcE has passed prelim survey, and the BS Information systems, candidate for level I. </p>"+


                "<h3>Goals</h3>"+
                "<p>The USM College of Engineering and Computing is committed to provide university education in agricultural engineering, civil engineering, and computing; meet the community's need for trained manpower in engineering and various technical and managerial capabilities, and conduct researches and extension activities geared towards the amelioration of the region and the community at large.</p>"+
                "<h3>Objectives</h3>"+
                "<p>The College of Engineering and Computing aims to become one of the premier institutions of engineering and information and communications technology in the country within five years. To achieve this, it will pursue the following courses of action:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li> •	Improve the quality of its graduates specifically in terms of performance in licensure exams and employability;</li>"+
                "<li> •	Increase books, other library acquisitions, and equipment; and improve student facilities to conform with national and international standards;</li>"+
                "<li> •	Increase oppurtunities for trainings and graduate studies among faculty and staff members;</li>"+
                "<li>•	Conduct more research, extension and income generation activities as well as publication of the results of such activities, all in support of the instruction function of the college; and </li>"+
                "<li> •	Strive to attain optimal efficiency in expenditure and the conduct of other administrative activities of the college.</li>"+

                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>•	Bachelor of Library and Information Science </li>"+
                "<li>•	Bachelor of Science in Agricultural Engineering</li>"+
                "<li>•	Bachelor of Science in Civil Engineering</li>"+
                "<li>•	Bachelor of Science in Computer Engineering</li>"+
                "<li>•	Bachelor of Science in Computer Science</li>"+
                "<li>•	Bachelor of Science in Electronics and Communications Engineering</li>"+
                "<li>•	Bachelor of Science in Information Systems</li>"+
                "</ul>"+

                "<p></p>"+
                "<p></p>";

              break;
            case "College of Human Ecology and Food Sciences Kabacan, Cotabato":
              image1.src = "img/CHEFS.png";
              title1.innerHTML = "College of Human Ecology and Food Sciences ";
              p1.innerHTML = "<p>The College of Human Ecology and Food Sciences is one of the original units of the university. It started as a Department called Home Technology in 1956. Two curricular offerings, the Bachelor of Science in Home Technology and Associate in Home Technology were the original course offerings. The year 1960 marked the emerging of discipline improvements. Two degree programs were offered, the Bachelor of Science in Home Economics and Bachelor of Science in Agricultural Home Economics. The former was intended for teacher educations while the latter for extension and related areas of specialization. In like manner, the department was also given a new name called the Department of Home Economics.</p>"+
                "<p>Sixteen years later (1976) the clamor for a special program for non-NCEE passers pressed the offering of Post - Secondary Vocational Home Economics (PSVHE) and in 1978, upon conversion of the school into a University, the Department was elevated into a College. In June 1977, the Bachelor of Science in Foods and Nutrition was offered but upon revision of its curriculum and recommendation from the Board of Nutrition, it was later changed to Bachelor of Science in Nutrition and Dietetics (1981).</p>"+
                "<p>The Post-Secondary Vocational Home Economics was ultimately phased out in 1982 and a year later (1983), the Bachelor of Science in Agricultural Home Economics was renamed to Bachelor in Home Science Extension. After seven (7) years (1990) however, the original name Bachelor of Science in Home Technology was reconsidered and approved for use. Two changes in unit name occurred: in 1984 it was called the College of Human Ecological Sciences (CHES) and in June 1993, upon approval of Memo Order no. 27 and BOR Resolution no. 12, in 1992, the College was renamed College of Human Ecology and Food Sciences (CHEFS). This was to keep abreast with the changing times thus making the college more viable to its clienteles.</p>"+
                "<p>In 1995, another degree program, the Bachelor of Science in Food Technology was offered to hopefully supply the manpower needs of several food processing plants located in the East Asian Growth Area (EAGA) of Mindanao. SY 2002-2003 marked another milestone, the Bachelor of Science in Hotel and Restaurant Management was offered vice the gradual phasing out of Bachelor of Science in Home Technology. On the other hand, the Bachelor of Science in Home Economics was realigned with the College of Education starting S.Y. 2004-2005 in compliance with the Commission on Higher Education (CHED) mandate of altogether grouping teacher education courses.</p>"+
                "<p>Presently, the College of Human Ecology and Food Sciences continues to serve graduates of both public and private secondary schools in the surrounding areas as well as transferees from other universities and colleges. Finally, summer short courses in food processing and baking commence in summer 2006 and a Diploma Course in Culinary Arts (One-year) was offered starting S.Y. 2006-2007.By virtue of the approved BOR last May 17, 2007 two courses was offered the Bachelor of Science in Tourism Management and Bachelor of Science in Travel Management.</p>"+

                "<h3>Goals</h3>"+
                "<p>The College of Human Ecology and Food Sciences through its fourfold functions of instruction, research, extension and resource generation is committed to develop the technical, managerial, personal and interpersonal competencies of its graduates. Specifically, it shall strive to create a network of expertise in human ecology, food sciences, hospitality and tourism in Southern Philippines, create opportunities to disseminate and update information along these fields, and enhance partnership of humans and the environment.</p>"+
                "<h3>Objectives</h3>"+
                "<p>The general objective of the College of Agriculture is to produce graduates who are locally and globally competitive; develop or train manpower resources who will provide moral leadership in the socio – economic and agri–industrial development of Southern Philippines, in support of national development endeavors.</p>"+
                "<p>To operationally aforementioned vision and mission, the following objectives will be pursued:</p>"+

                "<ul style='list-style-type:none'>"+
                "<li>1.	train or educate undergraduate and graduate students and various clienteles in support of instruction, research, extension, and income generation through its curricular offerings: Nutrition and Dietetics, Food Technology,	Hotel and Restaurant Management,	Travel Management and Tourism</li>"+
                "<li>2.	provide a venue for sharing and exchange of CHEFS related resources and information on instruction, research, and development, extension and resource generation; and</li>"+
                "<li>3.	initiate linkages aimed at developing and upgrading leaders in the fields of nutrition and dietetics, food technology, hotel and restaurant management, travel and tourism management.</li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>Bachelor of Science in Food Technology</li>"+
                "<li>Bachelor of Science in Hotel and Restaurant Management</li>"+
                "<li>Bachelor of Science in Nutrition and Dietetics</li>"+
                "<li>Bachelor of Science in Tourism Management</li>"+
                "<li>Bachelor of Science in Travel Management</li>"+
                "</ul>"+
                "<p></p>"+
                "<p></p>";

              break;

            case "College of Veterinary Medicine - Annex Kabacan, Cotabato":
            case "College of Veterinary Medicine Kabacan, Cotabato":
              image1.src = "img/CVM.png";
              title1.innerHTML = "College of Veterinary Medicine";
              p1.innerHTML =
                "<p>The Department of Veterinary Medicine was established in 1981 by the University of Southern Mindanao in response to regional poultry and livestock needs.  It was envisioned to produce competent veterinarians who will participate in boosting livestock and poultry productivity.  Aside from providing manpower for instruction, research, extension and production, the graduates are also expected to help safeguard the public from animal diseases that are transmissible to human beings.</p>"+
                "<p>Since 1981 up to mid 1988, the Department was a unit of the College of Agriculture.  On July 8, 1988, the Department was converted into the Institute of Veterinary Medicine.  Since then, the Institute became a separate academic unit of the University of Southern Mindanao.</p>"+
                "<p>It was realized however, that the present set-up of the unit of is working against the objective of the University, i.e.:  to create a strong impact in the said field of specialization.  To satisfy the requirement set by the Technical Panel for Agricultural Education, Resolution No. 24, s, 1994 recommended the conversion of the Institute of Veterinary Medicine to Regents of the University of Southern Mindanao held at DECS Office Ultra, Pasig City o November 10, 1994.</p>"+
                "<p>The college was presented an Award of Distinction as Center of Excellence of Doctor of Veterinary Medicine with all the rights and privileges effective February 27,2009 to February 27,2012 by the Office of the President and the Commission on Higher Education. The College was also awarded level III accredited in its Doctor of Veterinary Medicine Program by the AACCUP, Inc.</p>"+
                "<p></p>"+
                "<p></p>"+
                "<p></p>"+

                "<h3>Goals and Objectives</h3>"+
                "<p>To produce graduates possessing competence in the practice of general veterinary medicine who could assist in the treatment, control and prevention of animal diseases.  These graduates shall be competent in the field of animal and public health.  Parallel with this, the graduates are trained to be effective agents in the delivery of animal health and production technologies.</p>"+
                "<p>Of great importance, the College aims to produce men and women who are sensitive to the needs of the society.  To make significant contribution in the field of animal health research that will benefit small scale poultry and livestock owners, through a meaningfull and vigorous extension program.</p>"+
                "<p>To achieve these objectives, the students are trained:</p>"+

                "<ul style='list-style-type:none'>"+
                "<li>1.	To diagnose, treat, prevent and control diseases, to conduct disease surveillance, and formulate animal health management programs;</li>"+
                "<li>2.	To perform functions related to public health, promotion and animal rights andTo learn the advancement of animal production and preservation of wildlife;</li>"+
                "<li>3.	Not only to become a competent veterinarian but also to enable them to acquire proficiency in communication skills and become familiar with basic principles in social and natural sciences.</li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>•	Doctor of Veterinary Medicine</li>"+
                "<li>•	BS Veterinary Technology</li>"+
                "<li>•	Veterinary Aide* (1 year) </li>"+
                "</ul>"+
                "<p></p>"+
                "<p></p>";

              break;
            case "7.117169, 124.832306":  //ISPEAR
              image1.src = "img/ISPEAR.png";
              title1.innerHTML = "College of Sports, Physical Education and Recreation Center  ";
              p1.innerHTML = "<p>The Sports, Physical Education and Recreation Center (SPERC) which was created in January 1985 were eventually converted to Institute of Sports, Physical Education (ISPEAR) by virtue of Board Resolution No. 12. s. 1992 as approved by the Board of Regents of December 10, 1992. As a service unit of the University, it primarily handles the Physical Education courses which are basic requirements for graduation of all baccalaureate degree programs. As the center of the sports development and education in the University, the unit is also tasked to produce competent professionals in the fields of sports, athletics, recreation, music and dance.</p>"+

                "<h3>Goals</h3>"+
                "<p>To maximize holistic development of a person with emphasis on physical wellness to become healthy and productive individuals.</p>"+
                "<h3>Objectives</h3>"+
                "<p>The ISPEAR functions with the following objectives.</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>1.	Plan and implement:</li>"+
                "<li>a.	professional programs for physical educators, sports coaches, recreation leaders and dancers;</li>"+
                "<li>b.	food Technology</li>"+
                "<li>c.	an integrated physical, sports and recreation programs; and</li>"+
                "<li>d.	sports development programs of the university.</li>"+
                "<li>2.	promote and preserve the Philippine Indigenous games, sports, music and dances;</li>"+
                "<li>3.	conduct researches in physical education, sports, recreation, cultural dances and music; and</li>"+
                "<li>4.	provide technical expertise to educational institutions, sports and recreation associations, and other agencies needing assistance in the promotion of physical education, sports, recreation, music and dance.</li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<p>Bachelor of Physical Education:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>a.	Sports Physical Education</li>"+
                "<li>b.	Sports Wellness and Management</li>"+
                "</ul>"+
                "<p></p>"+
                "<p></p>";
              break;

            case "College of Middle East Asian Studies Kabacan, Cotabato":
              image1.src = "img/IMEAS1.png";
              title1.innerHTML = "Institute of Meddle East and Asian Studies ";
              p1.innerHTML = "<p>The Institute of Middle East and Asian Studies was conceived and established during the presidency of DR. JAMAN S. IMLAN, Al Hadj, of the University of Southern Mindanao. By virtue of the BOR Resolution No. 20, series of 1983, the Institute was made operation on June 1988 with the degree offering of Bachelor of Arts in Islamic Studies.</p>"+
                "<p>The Muslim motif edifice was constructed by the Salanatin Construction Firm and was accepted by DR. KUNDO E. PAHM President of this University on August 8, 1989.</p>"+
                "<p>Subsequently, when DR. VIRGILIO G. OLIVA has assumed the Office of the President of the USM, he took the initiative of naming this beautiful edifice as Salipada K. Pendatun Building by virtue of the BOR Resolution No.9, series of 1995.</p>"+
                "<p>This Institute has remained an independent academic unit of the University of Southern Mindanao as per declaration of the former President DR. JESUS ANTONIO G. DERIJE in 2009.</p>"+
                "<p></p>"+

                "<h3>VISION</h3>"+
                "<p>The Institute of Middle East and Asian Studies envisions achieving progress and cultural development in Mindanao.</p>"+

                "<h3>MISSION</h3>"+
                "<p>To produce versatile manpower guided by the tenets of Islam who will respond to the development thrust of the National Government.</p>"+

                "<h3>GOALS & OBJECTIVES</h3>"+
                "<p>The Institute generally aims to provide tertiary level of education to the Muslim society in order to produce righteous people of the community. Specially, it aims to:</p>"+
                "<ul style='list-style-type:none'>"+
                "<li>1.	Help promote socio-cultural diversity and economic development</li>"+
                "<li>2.	Help produce qualified and competent Arabic Teachers pursuant to letter of Instruction no. 71 A.</li>"+
                "<li>3.	Help contribute to the development of the accelerated implementation of Shariah Law in this part of the country.</li>"+
                "<li>4.	Help professionalize human resources who will link with the Middle East Countries.</li>"+
                "<li>5.	Help contribute to the modernization of the community within the framework of the Islamic faith.</li>"+
                "</ul>"+

                "<h3>Courses Offered</h3>"+
                "<ul style='list-style-type:none'>"+
                "<li>Bachelor of Science in Islamic Studies</li>"+
                "<li>Bachelor of Science in International Relation</li>"+
                "</ul>"+
                "<p></p>"+
                "<p></p>";
              break;
          default:
              title1.innerHTML = "Content not available";
              break;

          }


  }
