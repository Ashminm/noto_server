const mongoose=require('mongoose')

const archiveSchema=new mongoose.Schema({
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

const archives=mongoose.model('archives',archiveSchema)
module.exports=archives