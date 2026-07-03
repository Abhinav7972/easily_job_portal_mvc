import express from 'express'
import path  from 'path'
import EjsLayouts from 'express-ejs-layouts';
import homeRoute from './src/routes/homeRoute.js';


const server = new express();


//server.use(express.static('src/views'));

//set up views path 
server.set('views',path.join(path.resolve(),'src','views'));

//setup view engine and ejs layput middleware
server.set('view engine','ejs')
server.use(EjsLayouts)

//setup path  to layout.ejs
server.set('layout','layout/layout');

//route
server.use('/',homeRoute) //home page 


server.listen(3000,()=>console.log('server began at 3000'))
