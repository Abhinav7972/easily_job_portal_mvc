import express from 'express'
import path  from 'path'
import HomeController from './src/controllers/home.controller.js';
import EjsLayouts from 'express-ejs-layouts';

const server = new express();
const home = new HomeController();

//server.use(express.static('src/views'));
server.set('views',path.join(path.resolve(),'src','views'));

server.set('view engine','ejs')
server.use(EjsLayouts)

server.set('layout','layout/layout');

server.get('/',home.Homepage)


server.listen(3000,()=>console.log('server began at 3000'))
