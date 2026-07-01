import express from 'express'

const server = new express();



server.get('/',(req,res)=> res.send('welcome to job portal good luck'))


server.listen(3000,()=>console.log('server began at 3000'))
