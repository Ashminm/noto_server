const mongoose=require('mongoose')

const privetSchema=new mongoose.Schema({
    passcode1:{
        type:Number,
        required:true
    },
    passcode2:{
        type:Number,
        required:true
    },
    passcode3:{
        type:Number,
        required:true
    },
    passcode4:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    }

})

const privets=mongoose.model('privets',privetSchema)
module.exports=privets