const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
    },
    body:{
        type:String,
    },
    category:{
        type:String
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    }
})

const notes=mongoose.model('notes',noteSchema)
module.exports=notes