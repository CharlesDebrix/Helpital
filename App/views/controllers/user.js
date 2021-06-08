const fs = require('fs');
const { cpuUsage } = require('process');
const user = require('../database/users.json');
const crypto = require('crypto');

// toutes les fonctions liées a l'enregistrement d'un nouveau compte

function checkEmailAvailable(email) {
    for (x in user) {
        if (user[x].email === email)
            return false;
    }
    return true;
}

// Cette fonction permet d'obtenir le dernier ID de la dernière personne de la DB et nous permet de créer un nouvel ID
function getIdNbr() {
    console.log(parseInt(user[user.length - 1].id) + 1);
    return parseInt(user[user.length - 1].id) + 1;
}

// #Todo pour le prochain sprint => Sécuriser le MDP transmis

exports.register = (req, res, next) => {
    // vérifie si l'email est disponible ou déjà utilisé, si disponible return true
    if (checkEmailAvailable(req.body.email) === true) {
        let obj = user;
        let id = getIdNbr();
        let data = {
            "id": id,
            "username": req.body.email,
            "name": "",
            "surname": "",
            "email": "",
            "dateDeNaissance": "",
            "phone": "",
            "password": getHashedPassword(req.body.pswd),
            "photo": ""
        };
        obj.push(data);
        // const jsonString = JSON.stringify({email: req.body.email, password: req.body.password });
        let jsonString = JSON.stringify(obj);
        fs.writeFile('views/database/users.json', jsonString, 'utf8', err => {
            if (err) {
                console.log('error writing file', err);
            } else {
                console.log('Successfully wrote file');
                return res.status(200).json({
                    userId: id,
                    message: 'Utilisateur créé'
                });
            }
        })
    } else {
        return res.status(401).json({error: 'cette adresse mail est déjà utilisée'});
    }
    return 0;
};

// Toutes les fontions liées au reset d'un password

// Fonction qui permet d'avoir l'ID de la personne qui doit reset son MDP
function getId(email) {
    for (x in user) {
        if (user[x].email === email) {
            return user[x].id;
        }
    }
    return 0;
}

// Récupère la position de l'objet JSON
function getProfileNumberById(id) {
    for (x in user) {
        if (user[x].id === id) {
            return x;
        }
    }
    return 0;
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

exports.resetPassword = (req, res, next) => {
    // selectionne si l'email a été trouvé ou non
    if (checkEmailAvailable(req.body.email) === false) {
        let id = getId(req.body.email);
        // ce qu'on va faire ici => réécrire sur le mot de passe
        let profile = getProfileNumberById(id);
        user[profile].password = getHashedPassword(req.body.pswd);
        let newJson = JSON.stringify(user);
        fs.writeFile('views/database/users.json', newJson, 'utf8', err => {
            if (err) {
                console.log('error writing file', err);
            } else {
                console.log('Successfully wrote file');
                return res.status(200).json({
                    userId: id,
                    message: 'Mot de passe modifié'
                });
            }
        })
    } else {
        return res.status(401).json({error: 'Utilisateur non trouvé'});
    }
}

// Toutes les fontions liées au droits d'un utilisateur


// comment récupérer l'id du profil ?
exports.hasPermission = (req, res, next) => {
    const ActualId = require('../database/current_user.json');
    let id = ActualId.id;
    let userById = getProfileNumberById(id);
    req.hasPermission = false;
    if (user[userById].role === 3) {
        console.log("he has permission");
        req.hasPermission = true;
        next();
    } else {
        return res.status(401).json({error: `L'utilisateur n'a pas la permission`});
    }
}