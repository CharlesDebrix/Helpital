const fs = require('fs')

function init() {
    createRooms()
}

function readSingleFile(e) {
    fs.readFile(e, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        return jsonString
    })
}

function createRoom(room, htmlRoom) {
    let divRoomNumber = document.createElement('div')
    let divRoomDevelopArrow = document.createElement('div')
    let spanRoomNumber = document.createElement('span')
    let iRoomArrow = document.createElement('i')

    spanRoomNumber.setAttribute('class', "room-title")

    spanRoomNumber.innerHTML += `${room.number}`
    divRoomNumber.appendChild(spanRoomNumber)

    divRoomNumber.setAttribute('class', 'room-title-div')
    divRoomDevelopArrow.setAttribute('class', 'room-arrow')
    iRoomArrow.setAttribute('class', 'material-icons')
    iRoomArrow.innerHTML = "keyboard_arrow_down"
    iRoomArrow.onclick = function (event) {
        if (iRoomArrow.innerHTML === "keyboard_arrow_down") {
            iRoomArrow.innerHTML = "keyboard_arrow_up"
            event.target.parentNode.parentNode.setAttribute('class', 'room-expanded')
            event.target.parentNode.parentNode.scrollIntoView()
        } else {
            iRoomArrow.innerHTML = "keyboard_arrow_down"
            event.target.parentNode.parentNode.setAttribute('class', 'room')
            event.target.parentNode.parentNode.scrollIntoView()
        }
        console.log()
    }
    divRoomDevelopArrow.appendChild(iRoomArrow)
    /*    if (room.bed_available === 0)
            divRoomNumber.innerHTML += "There is no bed available in this room<br>"
        else if (room.bed_available === 1)
            divRoomNumber.innerHTML += `There is ${room.bed_available} bed available in this room<br>`
        else
            divRoomNumber.innerHTML += `There are ${room.bed_available} beds available in this room<br>`

        room.beds.forEach(function (bed) {
            if (bed.availability === "vacant")
                divRoomNumber.innerHTML += `The bed ${bed.number} is empty<br>`
            else
                divRoomNumber.innerHTML += `The bed ${bed.number} is taken<br>`
        })*/
    htmlRoom.appendChild(divRoomNumber)
    htmlRoom.appendChild(divRoomDevelopArrow)
}

function createRooms() {
    let element = document.getElementById('rooms_list')

    roomAvailability.rooms.forEach(function (room) {
        let li = document.createElement('div');
        li.setAttribute('class', 'room')
        createRoom(room, li)
        element.appendChild(li);
    });
}

const roomAvailability = {
    "rooms": [
        {
            "number": 301,
            "capacity": 2,
            "taken": 1,
            "bed_available": 1,
            "beds": [
                {
                    "number": 0,
                    "availability": "vacant"
                },
                {
                    "number": 1,
                    "availability": "taken"
                }
            ]
        },
        {
            "number": 302,
            "capacity": 1,
            "taken": 1,
            "bed_available": 0,
            "beds": [
                {
                    "number": 0,
                    "availability": "taken"
                }
            ]
        },
        {
            "number": 303,
            "capacity": 1,
            "taken": 0,
            "bed_available": 1,
            "beds": [
                {
                    "number": 0,
                    "availability": "vacant"
                }
            ]
        },
        {
            "number": 304,
            "capacity": 4,
            "taken": 1,
            "bed_available": 3,
            "beds": [
                {
                    "number": 0,
                    "availability": "vacant"
                },
                {
                    "number": 1,
                    "availability": "vacant"
                },
                {
                    "number": 2,
                    "availability": "vacant"
                },
                {
                    "number": 3,
                    "availability": "taken"
                }
            ]
        }
    ]
}