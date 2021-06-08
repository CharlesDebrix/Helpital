let refresh = false;
var percent_test = 0;
var percent_download_test = 0;

function load(searched) {
    console.log("Page load finished");
    if (searched) {
        let jsonObj = getPatient(searched);
        percent_test = 70; console.log("Récupération de la data dans la db local: Success (" + percent_test + "%)");
        if (refresh === false) {
            refresh = true;
            displayInfoPatient(jsonObj);
        } else {
            location.reload();
            // console.log("il passe par ici else")
            // refresh = false;
            displayInfoPatient(jsonObj);
            // load(jsonObj);
            refresh = true;
        }
    }
}

function getPatient(name) {
    const file = "./database/capsule_patient.json";
    var request = new XMLHttpRequest();
    request.open("GET", file, false); percent_test = 20; console.log("Ouverture du fichier avec route GET: Success (" + percent_test + "%)");
    if (request.send(null) != null)
        console.log("500 Bad API transfer\nData not send\n")
    // request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    percent_test = 40; console.log("Parsing de la data: Success (" + percent_test + "%)");
    for (x in my_JSON_object) {
        if (my_JSON_object[x].vitalcard === name) {
            console.log('vitalcard', my_JSON_object[x]);
            return my_JSON_object[x];
        } else if (my_JSON_object[x].name === name) {
            console.log('name', my_JSON_object[x]);
            return my_JSON_object[x];
        } else if (my_JSON_object[x].fullname === name) {
            console.log('name', my_JSON_object[x]);
            return my_JSON_object[x];
        }
    }
    console.log("400 Bad API return\nData not transfered\n");
}


const $ = require('jquery')

$('document').ready( () => {
    const search_input = document.getElementById("search_patient");

    if (search_input) {
        document.getElementById("search").addEventListener('click', () => {
            console.log("il detecte un event", search_input.value);
            load(search_input.value);
        });
    }
})

function displayInfoPatient(my_JSON_object) {
    // Name
    var mainContainer = document.getElementById("patient_pres");
    var div = document.createElement("p");
    div.innerHTML = '</br>' + my_JSON_object.name + ' ' + my_JSON_object.fullname + ' ';
    mainContainer.appendChild(div);

    // Name
    var mainContainer = document.getElementById("patientname");
    var div = document.createElement("p");
    div.innerHTML = 'Nom: </br>' + my_JSON_object.name + ' ';
    mainContainer.appendChild(div);

    // Prénom
    var mainContainer = document.getElementById("patientsurname");
    var div = document.createElement("p");
    div.innerHTML = 'Prénom: </br>' + my_JSON_object.fullname + ' ';
    mainContainer.appendChild(div);

    // Birthdate
    var mainContainer = document.getElementById("birthdate");
    var div = document.createElement("p");
    div.innerHTML = 'Date de naissance: </br>' + my_JSON_object.birthdate + ' ';
    mainContainer.appendChild(div);

    // Bloodgroup
    var mainContainer = document.getElementById("bloodgroup");
    var div = document.createElement("p");
    div.innerHTML = 'Groupe sanguin: </br>' + my_JSON_object.bloodgroup + ' ';
    mainContainer.appendChild(div);

    // Allergie
    var mainContainer = document.getElementById("allergen");
    var div = document.createElement("p");
    div.innerHTML = 'Allergie: </br>' + my_JSON_object.allergies + ' ';
    mainContainer.appendChild(div);

    // Vital Card
    var mainContainer = document.getElementById("cartevitale");
    var div = document.createElement("p");
    div.innerHTML = 'Numéro de carte vitale: </br>' + my_JSON_object.vitalcard;
    mainContainer.appendChild(div);

    // Room
    var mainContainer = document.getElementById("chambre");
    var div = document.createElement("p");
    div.innerHTML = 'Chambre: </br>' + my_JSON_object.room + ' ';
    mainContainer.appendChild(div);

    // Hospital
    var mainContainer = document.getElementById("historique");
    var div = document.createElement("p");
    div.innerHTML = 'Historique hospitalier: </br>' + my_JSON_object.hosp_histo + ' ';
    mainContainer.appendChild(div);

    // Antécédant
    var mainContainer = document.getElementById("antecendant");
    var div = document.createElement("p");
    div.innerHTML = 'Antécédant: </br>' + my_JSON_object.antecedant + ' ';
    mainContainer.appendChild(div);

    // Documents
    var mainContainer = document.getElementById("documents");
    var div = document.createElement("p");
    for (x in my_JSON_object.documents) {
        div.innerHTML = 'Documents: </br>' + my_JSON_object.documents[x].name + ' ' + '<a id="downloadButton" href="' + my_JSON_object.documents[x].path + '" download="' + my_JSON_object.documents[x].name + '_' + my_JSON_object.name + '">Download</a>'
    }
    mainContainer.appendChild(div);

    const downloadbut = document.getElementById("downloadButton");

    if (downloadbut) {
        downloadbut.addEventListener('click', () => {
            console.log("il detecte le download");
            percent_download_test = 100; console.log("Affichage récupération fichier patient opérationnel: Success (" + percent_download_test + "%)");
            console.log("200 Success API return\n");
        });
    }

    percent_test = 100; console.log("Affichage information patient opérationnel: Success (" + percent_test + "%)");
    console.log("200 Success API return\n");
}
