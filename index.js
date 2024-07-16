require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./Connection/db')
const router=require('./routes/route')

const noto=express()
noto.use(cors())
noto.use(express.json())
noto.use(router)

const PORT=3000 || process.env.PORT

noto.listen(PORT,()=>{
    console.log('Note Appp Running:',PORT);
})
noto.get('/',(req,res)=>{
    res.send('<h3>Waiting for request......!!</h3>')
})