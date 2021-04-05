const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const isMac = process.platform === 'darwin';

function createWindow() {
  let width = 900;
  let height = 680;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
