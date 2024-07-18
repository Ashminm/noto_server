const mongoose=require('mongoose')

const todoSchema=new mongoose.Schema({
    title:{
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
    }
})

const todos=mongoose.model('todos',todoSchema)
module.exports=todos