// 災害警報
let map;
let position = [];
let earthquake = [];

window.initMap = initMap;
let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0016-001?Authorization=CWB-1E61E837-116F-4D78-88DE-8A6CA81E6EE3&limit=5&sort=sort"
let bigurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=CWB-1E61E837-116F-4D78-88DE-8A6CA81E6EE3"

fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  if (data.success = true) {
    let Earthquake = data.records.Earthquake;
    for (let i = 0; i < Earthquake.length; i++) {
      let container = {};
      container.OriginTime = Earthquake[i].EarthquakeInfo.OriginTime;
      let index = Earthquake[i].ReportContent.length - 3;
      let level = Earthquake[i].ReportContent.substring(index, index + 1);
      container.level = level + "級";
      container.locatedetail = "地點：" + Earthquake[i].EarthquakeInfo.Epicenter.Location;
      container.depthdetail = "深度：" + Earthquake[i].EarthquakeInfo.FocalDepth + "km";
      container.magnitudedetail = Earthquake[i].EarthquakeInfo.EarthquakeMagnitude.MagnitudeValue;

      let eqposition = {};
      eqposition.lat = Earthquake[i].EarthquakeInfo.Epicenter.EpicenterLatitude;
      eqposition.lng = Earthquake[i].EarthquakeInfo.Epicenter.EpicenterLongitude;

      position.push(eqposition);

      container.epicenter = eqposition;
      earthquake.push(container);

    }
  }
});



fetch(bigurl).then(function (response) {
  return response.json();
}).then(function (data) {
  if (data.success = true) {
    let Earthquake = data.records.Earthquake;
    for (let i = 0; i < Earthquake.length; i++) {
      let container = {};
      container.OriginTime = Earthquake[i].EarthquakeInfo.OriginTime;
      let index = Earthquake[i].ReportContent.length - 3;
      let level = Earthquake[i].ReportContent.substring(index, index + 1);
      container.level = level + "級";
      container.locatedetail = "地點：" + Earthquake[i].EarthquakeInfo.Epicenter.Location;
      container.depthdetail = "深度：" + Earthquake[i].EarthquakeInfo.FocalDepth + "km";
      container.magnitudedetail = Earthquake[i].EarthquakeInfo.EarthquakeMagnitude.MagnitudeValue;


      let eqposition = {};
      eqposition.lat = Earthquake[i].EarthquakeInfo.Epicenter.EpicenterLatitude;
      eqposition.lng = Earthquake[i].EarthquakeInfo.Epicenter.EpicenterLongitude;
      position.push(eqposition);

      container.epicenter = eqposition;
      earthquake.push(container);
    }
  }
});


earthquake.sort(function (a, b) {
  let dateA = new Date(a.OriginTime);
  let dateB = new Date(b.OriginTime);
  return dateB - dateA;
});



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.58, lng: 120.90 },
    zoom: 7.5,
    mapTypeId: "terrain",
    disableDefaultUI: true,
    gestureHandling: "none",
    zoomControl: false,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  setTimeout(() => {
    for (let i = 0; i < earthquake.length; i++) {
      const marker = new google.maps.Marker({
        position: earthquake[i].epicenter,
        map: map,
      });
    }
  }, 1000);

}
setTimeout(() => {
  for (let i = 0; i < earthquake.length; i++) {

    let tr = document.createElement("tr");
    tr.setAttribute("class", "earthquakecontent");
    let tdtime = document.createElement("td");
    dateTime = earthquake[i].OriginTime;
    [date, time] = dateTime.split(" ");
    let datep = document.createElement("p");
    datep.textContent = date;
    let timep = document.createElement("p");
    timep.textContent = time;
    tr.appendChild(tdtime);
    tdtime.appendChild(datep);
    tdtime.appendChild(timep);

    let tdlevel = document.createElement("td");
    tdlevel.setAttribute("class", "earthquakedetail");
    let dot = document.createElement("sapn");
    dot.setAttribute("id", "level");
    dot.textContent = earthquake[i].level;
    if (earthquake[i].magnitudedetail < 5.5) {
      dot.style.backgroundColor = "#b8dc7f"
    }
    else if (6.0 > earthquake[i].magnitudedetail >= 5.5) {
      dot.style.backgroundColor = "#FFD24C"
    }
    else if (6.5 > earthquake[i].magnitudedetail >= 6.0) {
      dot.style.backgroundColor = "#F1A661"
    }
    else if (earthquake[i].magnitudedetail >= 6.5) {
      dot.style.backgroundColor = "#FF5D5D"
    }
    tr.appendChild(tdlevel);
    tdlevel.appendChild(dot);

    let tddetail = document.createElement("td");
    tddetail.setAttribute("class", "earthquakedetail");
    let locatep = document.createElement("p");
    locatep.textContent = earthquake[i].locatedetail;
    let depthp = document.createElement("p");
    depthp.textContent = earthquake[i].depthdetail;
    let magnitudep = document.createElement("p");
    magnitudep.textContent = "地震規模：" + earthquake[i].magnitudedetail;
    tr.appendChild(tddetail);
    tddetail.appendChild(locatep);
    tddetail.appendChild(depthp);
    tddetail.appendChild(magnitudep);

    document.getElementsByClassName("earthquaketable")[0].appendChild(tr);

  }
}, 500);