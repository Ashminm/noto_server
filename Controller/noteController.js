const notes=require('../Model/noteModel')

exports.addNote=async(req,res)=>{
    const {id,title,body,category}=req.body

    try{
        const existingNote=await notes.findOne({id,title})
        if(existingNote){
            res.status(406).json('Existing Note')
        }else{
            const newNote=new notes({id,title,body,category,date:Date.now()})
            await newNote.save()
            res.status(200).json(newNote)
        }
    }catch(err){
        res.status(401).json('Something went wrong:'+err)
    }
}