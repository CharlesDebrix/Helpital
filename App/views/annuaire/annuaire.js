const fs = require("fs");

function addRow() {
    var myName = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= email.value;
    row.insertCell(3).innerHTML= phone.value;
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

function deleteRow(obj) {

    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}

function load() {
    console.log("Page load finished");

    const file = "../database/annuaire.json";
    var request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    
    for (var i = 0; i < my_JSON_object.length; i++) {
        var table = document.getElementById("myTableData");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
        row.insertCell(1).innerHTML= my_JSON_object[i].name;
        row.insertCell(2).innerHTML= my_JSON_object[i].email;
        row.insertCell(3).innerHTML= my_JSON_object[i].phone;
    }
}