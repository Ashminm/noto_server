const notes=require('../Model/noteModel')
const todos=require('../Model/todoModel')

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

exports.deleteNote=async(req,res)=>{
    try{
        const NId= req.params.id
        const Result= await notes.findOneAndDelete({_id:NId})
        res.status(200).json(Result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.EditNote=async(req,res)=>{
        const Nid=req.params.id
        const {title,body}=req.body
        const date=Date.now()
    try{
        const existingNote=await notes.findOne({title,body})
        if(existingNote){
            res.status(406).json("Already Exist")
        }else{
            const Result=await notes.findByIdAndUpdate({_id:Nid},{title,body,date})
            res.status(200).json(Result)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

exports.recoverTask=async(req,res)=>{
    // const {title, category, date}=req.body
    // try{
    //     const hasBodyField = 'body' in notes.schema.paths;
    //     if(hasBodyField){
    //         const { body } = req.body;
    //          const existingNote= await notes.findOne({title,body})
    //              if(existingNote){
    //                 res.status(406).json("Exising Note!!")
    //              } else{
    //                 newNote=new notes({title,body,category,date})
    //                 await newNote.save();
    //                 res.status(200).json(newNote)
    //                 console.log("Note Added"); 

    //              }
    //     }else{

    //         const existingTodo=await todos.findOne({title})
    //             if(existingTodo){
    //                 res.status(406).json("Existing todo!!")
    //             }else{
    //                 const newTodo=new todos({title,category,date})
    //                 await newTodo.save()
    //                 res.status(200).json(newTodo)
    //                 console.log("Todo Added");

    //             }
    //     }
    // }catch(err){
    //     res.status(500).json(err)
    // }
}