const electron =require('electron');
const url=require('url');
const path=require('path');

const {app,BrowserWindow,Menu}=electron;

let mainWindow;
let addWindow;

//Listen for app to be ready
app.on('ready',function(){
    //Create new window
mainWindow=new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));

    //Quit app when closed
    mainWindow.on('closed',function(){
        app.quit();
    })

    //Build menu from template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){
    addWindow=new BrowserWindow({
        width:500,
        height:300,
        title:'Add Shopping List Item'
    });
    //Load html into window
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    //Garbage collection handle
    addWindow.on('close',function(){
        addWindow=null;
    });

}

//Create menu template
const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Quit',
                accelerator:'CmdOrCtrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//Developer tools
if(process.env.NODE_ENV!=='production')
{
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle Dev Tools',
                accelerator:'CmdOrCtrl+I',
                click(item,focusedWindow)
                {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
}