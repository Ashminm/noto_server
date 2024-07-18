const notes=require('../Model/noteModel')

exports.addNote=async(req,res)=>{
    const {title,body}=req.body
    const cate="Recent"
    try{
        const existingNote=await notes.findOne({title,body})
        if(existingNote){
            res.status(406).json('Existing Note!!')
        }else{
            const newNote=new notes({title,body,category:cate,date:Date.now()})
            await newNote.save()
            res.status(200).json(newNote)
        }
    }catch(err){
        res.status(401).json('Something went wrong:'+err)
    }
}

exports.getAllNotes=async(req,res)=>{
    try{
        const Allnotes=await notes.find()
        res.status(200).json(Allnotes)
    }catch(err){
        res.status(401).json("Somthing went wrong:"+err)
    }
}

exports.getSingleNote=async(req,res)=>{
    try{
        const Result=await notes.findOne({_id:req.params.id})
        res.status(200).json(Result)
    }catch(err){
        res.status(401).json(err)
    }
}