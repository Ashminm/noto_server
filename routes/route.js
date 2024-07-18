const express=require('express')

const noteController=require('../Controller/noteController')
const todoController=require('../Controller/todoController')

const router=new express.Router()

router.post('/add-note',noteController.addNote)
router.get('/get-all-notes',noteController.getAllNotes)
router.get('/get-single-notes/:id',noteController.getSingleNote)
router.post('/add-todo',todoController.addTodo)
router.get('/get-all-todo',todoController.getAllTodo)
router.get('/get-single-todos/:id',todoController.getSingleTodo)



module.exports=router