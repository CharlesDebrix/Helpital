const electron = require('electron');
const app = require('./app');
const login = require('./loginpage/login');

let window;
 
function createWindow() {
    /* Créer une fenêtre de 1200px par 800px sans bordures */
    window = new electron.BrowserWindow({
        width: 1920,
        height: 1080,
        frame: false,
        webPreferences: {
            /* eslint-disable no-eval */
            nodeIntegration: true
        }
    });
 
    /* Si vous décommentez cette ligne, vous verrez la console de débug Chrome */
    window.webContents.openDevTools();
 
    /* Display the homepage of the server */
    window.loadURL('http://127.0.0.1:3000');
 
    /* Lorsque la fenêtre est fermée, on l'indique au système */
    window.on('closed', () => {
        window = null;
    });
}
 
/* On attend qu'Electron.js soit prêt pour créer la fenêtre */
electron.app.on('ready', function () {
    app.start(function () {
        createWindow();
    });
});
 
/* Cette fonction arrête totalement l'application 
   lorsque toutes les fenêtres sont fermées */
electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

// TO DO TODO A ENLEVER A LA FIN console.log
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/* Fonction utile pour MacOS */
electron.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});