/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
const login = require('./loginpage/login');
const path = require('path');
const flash = require('connect-flash');
let session = require('express-session');
let cons = require('consolidate');
let bodyParser = require('body-parser');
const fs = require('fs');

/* Ajout de express-ejs-layouts */
// const ejsLayout = require('express-ejs-layouts');
const { nextTick, cpuUsage } = require('process');
const crypto = require('crypto');

/* Initialisation des variables */
const router = {
    isStarted: false
};

function start(callback) {
    if (router.isStarted === false) {
        init(function () {
            loadRoutes(function () {
                /* Lance le serveur web sur le port 3000 */
                http.listen(3000, function () {
                    console.log('Application is running on port 3000');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                });
            });
        });
    } else {
        console.log("Application already started");
        if (typeof callback != 'undefined') {
            callback();
        }
    }
}
 
function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
    
    /* Ajout de express-ejs-layouts */
    // expressApp.use(ejsLayout);
    expressApp.use(flash());
    /* Ajout du répertoire pour link le js */
    expressApp.use(express.static(__dirname + '/'));
    expressApp.use(session({ cookie: { maxAge: 60000 }, secret: 'woot', resave: false, saveUninitialized: false}));
    // expressApp.set('view engine', 'ejs');
    /* J'utilise ici EJS comme moteur de template */
    expressApp.engine('html', cons.swig)
    // expressApp.set('view engine', 'html');
    expressApp.set('view engine', 'html');

    expressApp.use(bodyParser.urlencoded({ extended: false }));
    expressApp.use(bodyParser.json());

    /* assets sera le répertoire où se trouverons nos fichiers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));

    /* views est défini comme notre dossier de vues par défaut */
    expressApp.set('views', path.join(__dirname, '/'));

    if (typeof callback != 'undefined') {
        callback();
    }
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

let users = [];

fs.readFile('./views/users.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);
});

/* ROUTES */

function loadRoutes(callback) {
    expressApp.get('/', function(req, res) {
        try {
            if (login.getToken === 0) {
                res.render('homepage/planning');
            } else {
                throw error;
            }
        } catch (error) {
            res.redirect('/login');
        }
    })

    expressApp.post('/', function(req, res) {
        try {
            if (login.getToken === 0) {
                res.render('homepage/planning');
            }
            throw error;
        } catch (error) {
            res.redirect('/login');
        }
    })

    expressApp.get('/login', function (req, res) {
        res.render('loginpage/login');
    })

    // to do :
    expressApp.get('/planning', function (req, res) {
        res.render('homepage/planning');
    })

    expressApp.get('/annuaire', function (req, res) {
        res.render('annuaire/annuaire');
    })

    expressApp.get('/appel', function (req, res) {
        res.render('appelpage/appel');
    })

    expressApp.get('/capsule', function (req, res) {
        res.render('patient/capsule');
    })

    expressApp.get('/chambres', function (req, res) {
        res.render('chambrespage/chambres');
    })

    expressApp.get('/patient/transfert', function (req, res) {
        res.render('patient/transfert');
    })

    // This will hold the users and authToken related to users
    const authTokens = {};

    expressApp.post('/signin', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = getHashedPassword(password);
        
        const user = users.find(u => {
            return u.username === username && hashedPassword === u.password
        });
    
        if (user) {
            const authToken = generateAuthToken();

            // Store authentication token
            authTokens[authToken] = user;

            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);
            res.status(200).send({message: "Logged."});
        } else {
            req.flash("messages", { "error" : "Invalid username or password" });
            res.status(401).send({message: "Not found."});
        }
    });
    
    if (typeof callback != 'undefined') {
        console.log("il passe par le typeof callback");
        callback();
    }
}
 
module.exports = {
    start: start
};