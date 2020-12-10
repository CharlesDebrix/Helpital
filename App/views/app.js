var app = {};
const login = require('./loginpage/login');

class App {
    constructor() {
        this.state = {
            isLogged: false,
            username: ''
        }
    }

    onChangeUserStatus(stateLogin) {
        this.setState({isLogged: stateLogin})
    }

    onChangeUsername(name) {
        this.setState({username: name})
    }
}

function start(callback) {
    init(function() {
        /* On démarre le routeur défini juste avant */
        app.router.start(function() {
            if(typeof callback != 'undefined') {
                callback();
            }
        });
    });
}

function init(callback) {
    /* On instancie notre module router */
    app.router = require('./router');
 
    if(typeof callback != 'undefined') {
        callback();
    }
}

module.exports = {
    start: start,
    App: App
};