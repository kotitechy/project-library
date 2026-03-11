// 1. check if the browser supports geolocation.

// 2. Set options for high accuracy, a 5-second timeout, and no caching. 
// 2.a Use watchPosition to track the user's location continuously.
// 2.b  Emit the latitude and longitude via a socket with "send-location". Log any errors to the console

// 3. Initialize a map centered at coordinates (0, 0) with a zoom level of 15 using Leaflet. Add OpenStreetMap tiles to the map

// 4. Create an empty object markers.


// 5. When receiving location data via the socket, extract id, latitude, and longitude, and center the map on the new coordinates.

// 6.  If a marker for the id exists, update its position, otherwise, create a new marker at the given coordinates and add it to the map. When a user disconnects, remove their marker from the map and delete it from markers.


let socket = io() //  get connection req to backend

console.log('hello');

const map = L.map('map').setView([0,0], 16)

// inbuilt object
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords // get cords
        // console.log(latitude, longitude) 
        socket.emit('send-location',{latitude, longitude}) // send to backend


    },(err)=>{
        console.log('error: ',err.message);
        
    },{
        enableHighAccuracy: true, // high accuracy
        maximumAge: 0 // get caching data false 
        , timeout: 2000 // get location for every 5 seconds
    })
}


// load the map
// markers[id].bindPopup(`user ${id}`)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// set markers
const markers = {}

// check backend msg
socket.on('recieve-location', (data)=>{
    const {id,latitude, longitude} = data
    map.setView([latitude, longitude], 25)
    if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
    // markers[id].setTooltipContent(`User ${id}`);
} else {
    markers[id] = L.marker([latitude, longitude])
        .addTo(map)
        .bindTooltip(`User ${id}`, { permanent: true, direction: 'top' });
    }
    const ids  = Object.keys(markers)
    console.log(ids.length,'users')
    // map.setView([latitude, longitude], 16);
})

// disconnection
// check backend msg
socket.on('user-disconnected', (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
        console.log('user disconnected: ',id)
    }
})