const mongoose=require('mongoose')

const privetNoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const privetNotes=mongoose.model('privetNotes',privetNoteSchema)
module.exports=privetNotes