const electron = require('electron');
const {app, BrowserWindow} = electron;
const url = require('url');
const path = require('path');

require('electron-reload')(__dirname,{
    electron:path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let windowObj = null;

function createWindow(){
    windowObj = new BrowserWindow({
        width: 800,
        height: 800,
        alwaysOnTop: true,
        minmizable: false,
        maximizable: false,
        center: true,
        autoHideMenuBar: true,
        resizable: false
    });

    windowObj.loadURL(url.format(path.join(__dirname, 'zombBlaster.html')));

    windowObj.on('closed', function(){
        windowObj = null;
    })
}

app.on('ready', createWindow);