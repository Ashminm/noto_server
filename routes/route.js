const express=require('express')

const noteController=require('../Controller/noteController')
const todoController=require('../Controller/todoController')
const trashController=require('../Controller/trashController')
const archiveController=require('../Controller/archiveController')
const privetController=require('../Controller/privetController')
const privetNoteController=require('../Controller/privetNoteModelController')

const JwtMidd=require('../Middilewares/jwtMiddileware')

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

router.post('/create-passcode',privetController.createPasscode)
router.post('/check-passcode',privetController.checkPasscode)
router.put('/forgot-passcode',privetController.forgotPasscode)

router.post('/add-to-privet/:id',JwtMidd,privetNoteController.addtoPrivet)
router.get('/get-privet-notes',JwtMidd,privetNoteController.getPrivetNotes)

module.exports=router