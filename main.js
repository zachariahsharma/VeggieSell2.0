const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const log = require('electron-log')
// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const userNumber = String(Math.floor(Math.random() * 100))
let mainWindow
let signinWindow
let openWindow
function createOpenWindow() {
  openWindow = new BrowserWindow({
    title: 'Welcome to Veggie Sell!',
    width: 1524,
    height: 900,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: true,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
})

  if (isDev) {
      openWindow.webContents.openDevTools()
  }

  openWindow.loadFile('./templates/open.html')
}
function createSigninWindow() {
  signinWindow = new BrowserWindow({
    title: 'Signin',
    width: 1524,
    height: 900,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: true,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
    },
})

  if (isDev) {
      signinWindow.webContents.openDevTools()
  }

  signinWindow.loadFile('./templates/signin.html')
}
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'VeggieSell',
    width: 1524,
    height: 900,
    icon: `${__dirname}/assets/icons/icon.png`,
    resizable: true,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
    },
  })
  
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
  
  mainWindow.loadFile('./templates/index.html')
}

app.on('ready', () => {
  createOpenWindow()
  // createSigninWindow()
  // createMainWindow()
  
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

const menu = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  {
    role: 'fileMenu',
  },
  ...(isDev
    ? [
      {
        label: 'Developer',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { type: 'separator' },
          { role: 'toggledevtools' },
          { role: 'copy' },
          { role: 'paste' }
        ],
      },
    ]
    : []),
  ]
  
  ipcMain.on('signup-info', (e, options) => {
    console.log(options)
    var nodemailer = require("nodemailer");
    
    
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "VeggieSell@gmail.com",
        pass: "PYWThbzMD8CLMFk",
      },
    });
    
    var mailOptions = {
      from: "VeggieSell@gmail.com",
      to: `${options.email}`,
      subject: "VeggieSell Auth Key",
      html: `<h1>Hello there</h1><p>Your entry key is ${userNumber}, you will use this to verify your email address for your new account.</p>`,
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
})
ipcMain.on('signin-info', (b, options) => {
  console.log(options)
})
ipcMain.on('authnum', (b,options) => {
  if(options.authnum === userNumber){
    console.log('authenticated')
  }else{
    console.log('ur bad')
  }
})
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.allowRendererProcessReuse = true
