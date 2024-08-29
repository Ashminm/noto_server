const express=require('express')

const noteController=require('../Controller/noteController')
const todoController=require('../Controller/todoController')
const trashController=require('../Controller/trashController')
const archiveController=require('../Controller/archiveController')

const router=new express.Router()

router.post('/add-note',noteController.addNote)
router.get('/get-all-notes',noteController.getAllNotes)
router.get('/get-single-notes/:id',noteController.getSingleNote)
router.delete('/delete-note/:id',noteController.deleteNote)
router.put('/Edit-note/:id',noteController.EditNote)
router.post('/reco-archive/:id',noteController.recoverArchive)

router.post('/Recover-task',noteController.recoverTask)

router.post('/add-todo',todoController.addTodo)
router.get('/get-all-todo',todoController.getAllTodo)
router.get('/get-single-todos/:id',todoController.getSingleTodo)
router.delete('/delete-todo/:id',todoController.Deletetodo)
router.put('/Edit-todo/:id',todoController.EditTodo)


router.post('/add-trash-all',trashController.addTrash)
router.get('/get-trash-all',trashController.getTrash)
router.delete('/delete-trash/:id',trashController.deleteTrash)
router.delete('/empty-trash',trashController.emptyTrash)

router.post('/add-archive/:id',archiveController.addArchive)
router.get('/get-archive',archiveController.getArchive)
router.get('/single-archive/:id',archiveController.getSingleArchive)
router.delete('/delete-archive/:id',archiveController.deleteArchive)
router.delete('/empty-archive',archiveController.emptyArchive)

module.exports=router