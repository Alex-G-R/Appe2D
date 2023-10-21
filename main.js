const {app, BrowserWindow } = require('electron');


app.whenReady().then(() => {

    // create a window
    const myWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    });

    myWindow.loadFile("index.html")
});