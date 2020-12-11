const fs = require('fs')

let roomAvailability;

function init() {
    fs.readFile('views/database/room_availability.json', (err, data) => {
        roomAvailability = JSON.parse(data);
        createRooms()
    })
}

function readSingleFile(e) {
    fs.readFile(e, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
    })
}

function createRoom(room) {
    let divRoomNumber = document.createElement('div')

    divRoomNumber.setAttribute("class", "n_room")

    divRoomNumber.innerHTML = `${room.number}`
    divRoomNumber.onclick = function () {
        if (divRoomNumber.getAttribute("class") === "n_room-active") {
            divRoomNumber.setAttribute("class", "n_room")
            divRoomNumber.innerHTML = `${room.number}`
        } else {
            divRoomNumber.setAttribute("class", "n_room-active")
            if (room.bed_available === 1) {
                divRoomNumber.innerHTML += `<br><br>Un seul lit disponible<br><br>Capacité de la chambre : ${room.capacity}`
            } else if (room.bed_available === 0) {
                divRoomNumber.innerHTML += `<br><br>Aucun lit disponible<br><br>Capacité de la chambre : ${room.capacity}`
            } else {
                divRoomNumber.innerHTML += `<br><br>Lits disponibles : ${room.bed_available}<br><br>Capacité de la chambre : ${room.capacity}`
            }
        }
    }
    return divRoomNumber
}

function createRooms() {
    let id = document.getElementById('rooms_list')
    let divNoSelect = document.createElement('div');

    divNoSelect.setAttribute('class', 'noselect')

    id.appendChild(divNoSelect)

    roomAvailability.rooms.forEach(function (room) {
        divNoSelect.appendChild(createRoom(room))
    });
}
