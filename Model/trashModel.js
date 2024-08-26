const mongoose=require('mongoose')

const trashSchema=new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String,
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

const trashs=mongoose.model('trashs',trashSchema)
module.exports=trashs
