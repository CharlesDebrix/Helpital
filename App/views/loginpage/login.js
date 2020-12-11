const jwt = require('jsonwebtoken');

function getCookie(cname) {
    // var name = cname + "=";
    // var decodedCookie = decodeURIComponent(document.cookie);
    // var ca = decodedCookie.split(';');
    // for(var i = 0; i <ca.length; i++) {
    //     var c = ca[i];
    //     while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //     }
    //     if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //     }
    // }
    return 84;
}

function check() {
    let myCookie = getCookie("AuthToken");

    if (myCookie !== 84) {
        return 0;
    }
    else {
        return 1;
    }
}

function loginClick() {
    let t2 = document.getElementById("userId");
    let t3 = document.getElementById("pswd");
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/signin",
        data : JSON.stringify({"username": t2.value, "password": t3.value}),
        timeout : 100000,
        success : function(data) {
            window.location.replace("/authentification/" + data);
        },
        error : function(e) {
            window.location.replace("/login");
        }
    });
}

module.exports.getToken = check();