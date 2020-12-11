function load() {
    console.log("Page load finished");

    const file = "./capsule_patient.json";
    var request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);

    // Name
    var mainContainer = document.getElementById("patient_pres");
    var div = document.createElement("p");
    div.innerHTML = '</br>' + my_JSON_object[0].name + ' ' + my_JSON_object[0].fullname + ' ';
    mainContainer.appendChild(div);

    // Name
    var mainContainer = document.getElementById("patientname");
    var div = document.createElement("p");
    div.innerHTML = 'Nom: </br>' + my_JSON_object[0].name + ' ';
    mainContainer.appendChild(div);

    // Prénom
    var mainContainer = document.getElementById("patientsurname");
    var div = document.createElement("p");
    div.innerHTML = 'Prénom: </br>' + my_JSON_object[0].fullname + ' ';
    mainContainer.appendChild(div);

    // Birthdate
    var mainContainer = document.getElementById("birthdate");
    var div = document.createElement("p");
    div.innerHTML = 'Date de naissance: </br>' + my_JSON_object[0].birthdate + ' ';
    mainContainer.appendChild(div);

    // Bloodgroup
    var mainContainer = document.getElementById("bloodgroup");
    var div = document.createElement("p");
    div.innerHTML = 'Groupe sanguin: </br>' + my_JSON_object[0].bloodgroup + ' ';
    mainContainer.appendChild(div);

    // Allergie
    var mainContainer = document.getElementById("allergen");
    var div = document.createElement("p");
    div.innerHTML = 'Allergie: </br>' + my_JSON_object[0].allergies + ' ';
    mainContainer.appendChild(div);

    // Vital Card
    var mainContainer = document.getElementById("cartevitale");
    var div = document.createElement("p");
    div.innerHTML = 'Numéro de carte vitale: </br>' + my_JSON_object[0].vitalcard;
    mainContainer.appendChild(div);

    // Room
    var mainContainer = document.getElementById("chambre");
    var div = document.createElement("p");
    div.innerHTML = 'Chambre: </br>' + my_JSON_object[0].room + ' ';
    mainContainer.appendChild(div);

    // Hospital
    var mainContainer = document.getElementById("historique");
    var div = document.createElement("p");
    div.innerHTML = 'Historique hospitalier: </br>' + my_JSON_object[0].hosp_histo + ' ';
    mainContainer.appendChild(div);

    // Antécédant
    var mainContainer = document.getElementById("antecendant");
    var div = document.createElement("p");
    div.innerHTML = 'Antécédant: </br>' + my_JSON_object[0].antecedant + ' ';
    mainContainer.appendChild(div);
}