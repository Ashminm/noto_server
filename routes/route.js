const express=require('express')

const noteController=require('../Controller/noteController')

const router=new express.Router()

router.post('/add-note',noteController.addNote)

module.exports=router