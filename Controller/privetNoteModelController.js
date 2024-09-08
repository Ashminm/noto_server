const privetNotes=require('../Model/privetNoteModel')
const notes=require('../Model/noteModel')


exports.addtoPrivet=async(req,res)=>{
    const{title,body,category,date}=req.body
    const PNid=req.params.id
    const userId = req.payload;
    const cate = "Privet"
    try{
        const existingNote=await privetNotes.findOne({userId,title,body,category})
        if(existingNote){
            res.status(406).json("Already exist the note!!")
        }else{
            const newNote=new privetNotes({title,body,category:cate,date:Date.now(),userId})
            await newNote.save()
            const result=await notes.findOneAndDelete({_id:PNid})
            if(result){
                res.status(200).json({newNote,result})
            }else{
                return res.status(404).json("Note not found for deletion")
            }
        }
    }catch(err){
        res.status(401).json(err)
        console.log(err);
        
    }
}

exports.getPrivetNotes=async(req,res)=>{
    try{
        const userId=req.payload
        // console.log(userId);
        const result=await privetNotes.find({userId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}