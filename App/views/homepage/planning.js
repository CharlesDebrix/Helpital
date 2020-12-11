const fs = require('fs');

let users = [];

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return;
}

function init() {
    fs.readFile('views/users.json', (err, data) => {
        users = JSON.parse(data);
        addElement();
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