// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV !=='production'

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Multiplication Calculator',
    width: isDev ? 800 : 200,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, './renderer/preload.js'),
      nodeIntegration: true,
    }
  })

  //open devtools if in dev env
  if(isDev){
    mainWindow.webContents.openDevTools();
  }

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname,'./renderer/index.html'))

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

//implement menu
const mainMenu = Menu.buildFromTemplate(menu);
Menu.setApplicationMenu(mainMenu);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//menu template
const menu = [
  {
    label:'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W'
      }
    ]
  }
]

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.