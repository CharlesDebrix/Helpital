const fs = require('fs');

let users = [];

let planning_data;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
}

function init() {
    fs.readFile('views/database/users.json', (err, data) => {
        users = JSON.parse(data);
        addElement();
    })
    fs.readFile('views/planning.json', (err, data) => {
        planning_data = JSON.parse(data);
        createPlanning();
    })
}

function addElement() {
    let cookieId = getCookie('Id');
    const user = users.find(u => {
        return u.id === cookieId;
    });
    let surname = document.getElementById('image_doctor');
    surname.insertAdjacentHTML('afterend', `<h1>Bonjour ${user.surname} !</h1>`);
}

const hours = [
    "0h-1h",
    "1h-2h",
    "2h-3h",
    "3h-4h",
    "4h-5h",
    "5h-6h",
    "6h-7h",
    "7h-8h",
    "8h-9h",
    "9h-10h",
    "10h-11h",
    "11h-12h",
    "12h-13h",
    "13h-14h",
    "14h-15h",
    "15h-16h",
    "16h-17h",
    "17h-18h",
    "18h-19h",
    "19h-20h",
    "20h-21h",
    "21h-22h",
    "22h-23h",
    "23h-24h",
]

function getIndexFromString(dayHour) {
    if (dayHour === "")
        return 25
    for (let i = 0; i < hours.length; i++) {
        if (dayHour === hours[i])
            return i;
    }
}

function getFALA(week) {
    let first_index = 25;
    let last_index = 0;
    let tmp_findex = 25;
    let tmp_lindex = 0;

    for (let i of week.days) {
        console.log(i)
        tmp_findex = getIndexFromString(i.first_active_hour)
        tmp_lindex = getIndexFromString(i.last_active_hour)
        if (tmp_lindex === 25)
            tmp_lindex = 0
        console.log(`first = ${first_index}\ntmpf = ${tmp_findex}\nlast = ${last_index}\ntmpl = ${tmp_lindex}`)
        if (tmp_findex < first_index)
            first_index = tmp_findex
        if (tmp_lindex > last_index)
            last_index = tmp_lindex
    }
    console.log(`first_index value = ${first_index} last index value ${last_index}`)
    return [first_index, last_index]
}

function createPlanning() {
    let planning = document.getElementById('planning')
    let index = getFALA(planning_data.weeks[0])
    console.log(planning_data)
    let button = function (hour, active) {
        let button = document.createElement('button')

        if (!active)
            button.setAttribute('class', 'hours')
        else
            button.setAttribute('class', 'hours-active')

        button.innerHTML += hour
        return button
    }

    let j = 0;

    let button_row = function (hour) {
        let div = document.createElement('div')
//        div.setAttribute('class', "noselect")
        for (let i = 0; i < 7; i++) {
            if (planning_data.weeks[0].days[i].hours[getIndexFromString(hour)].active === true)
                div.appendChild(button(hour, true))
            else
                div.appendChild(button(hour, false))
        }
        return div
    }

//    planning_data.weeks[0].days[0].hours[]
    for (let i = index[0]; i <= index[1]; i++) {
        planning.appendChild(button_row(hours[i]))
    }
}