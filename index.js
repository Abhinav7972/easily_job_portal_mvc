import express from 'express'
import path  from 'path'
import HomeController from './src/controllers/home.controller.js';
const server = new express();
const home = new HomeController();
server.use(express.static('src/views'))
server.set(path.join(path.resolve(),'src','views'))

server.get('/',(req,res)=> home.getHome)


server.listen(3000,()=>console.log('server began at 3000'))
