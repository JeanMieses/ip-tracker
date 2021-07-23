const userInput = document.querySelector('#ip_address');
const form = document.querySelector('form');
const mymap = L.map('map');

window.onload = async function () {
  const data = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_H4rEyfLcL1dEupnpCxXIdreIDg1z8&ipAddress=`);
    console.log(data);
    updatePage(data.data.ip, data.data.location.city, data.data.location.timezone, data.data.as.name);
    mymap.setView([data.data.location.lat, data.data.location.lng], 9);
    const marker = L.marker([data.data.location.lat, data.data.location.lng], {icon: customMarker}).addTo(mymap);
}
// displaying map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVhbjIwMjEiLCJhIjoiY2twMDU2OXo4MTA3dzJ2bXdoYm8xcTJ3bCJ9.ZFoCfbfspF92VtE2WFXIjA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVhbjIwMjEiLCJhIjoiY2twMDU2OXo4MTA3dzJ2bXdoYm8xcTJ3bCJ9.ZFoCfbfspF92VtE2WFXIjA'
}).addTo(mymap);

// custom marker for the map
const customMarker =  L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [28, 39],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'images/icon-location.svg',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ipAddress = userInput.value.toString();
    let data = await fetchData(ipAddress);
    mymap.setView([data.location.lat, data.location.lng], 9);
    const marker = L.marker([data.location.lat, data.location.lng], {icon: customMarker}).addTo(mymap);
    updatePage(data.ip, data.location.city, data.location.timezone, data.as.name);
    userInput.value = '';
})

//fetching ip data such as location, etc...
async function fetchData(ipAddress) {
  const userData = await
  axios.get(`https://geo.ipify.org/api/v1?apiKey=at_H4rEyfLcL1dEupnpCxXIdreIDg1z8&ipAddress=${ipAddress}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
    })
  return userData;
}

function updatePage(ip, location, timezone, isp) {
  document.querySelector('.show-ip').innerText = ip;
  document.querySelector('.location').innerText = location;
  document.querySelector('.timezone').innerText = `UTC ${timezone}`;
  document.querySelector('.isp').innerText = isp;
}
