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

exports.unPrivet=async(req,res)=>{
    const{title,body,category,date}=req.body
    const PNid=req.params.id
    try{
        const existingNote=await notes.findOne({title,body,category})
        if(existingNote){
            res.status(406).json("Already in your not pade!")
        }else{
            const newNote=new notes({title, body, category, date})
            await newNote.save()
            const result= await privetNotes.findOneAndDelete({_id:PNid})
            if(result){
                res.status(200).json({newNote,result})
            }else{
                return res.status(404).json("Privet not found for deletion");
            }
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deletePrivetNote=async(req,res)=>{
    try{
        const PId=req.params.id
        const result = await privetNotes.findByIdAndDelete({_id:PId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
        console.log(err);
        
    }
}


exports.EmptyPrivet=async(req,res)=>{
    try{
        const userId=req.payload
        const result=await privetNotes.deleteMany({userId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.NewAddPrivetNote=async(req,res)=>{
    const {title,body}=req.body
    const userId=req.payload
    const cate="Privet"
    try{
        const existingNote=await privetNotes.findOne({title,body,userId})
        if(existingNote){
            res.status(406).json("Existing privet note")
        }else{
            const newPrivet=new privetNotes({title,body,category:cate,date:Date.now(),userId})
            await newPrivet.save()
            res.status(200).json(newPrivet)
        }
    }catch(err){
        res.status(500).json("Somthing went wrong"+err)
    }

}