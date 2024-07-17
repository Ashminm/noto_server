const express=require('express')

const noteController=require('../Controller/noteController')

const router=new express.Router()

router.post('/add-note',noteController.addNote)
router.get('/get-all-notes',noteController.getAllNotes)
router.get('/get-single-notes/:id',noteController.getSingleNote)




module.exports=router