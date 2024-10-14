const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    body:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    }
})

const notes=mongoose.model('notes',noteSchema)
module.exports=notes