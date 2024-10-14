const notes=require('../Model/noteModel')
const todos=require('../Model/todoModel')
const archives=require('../Model/archiveModel')
const { model } = require('mongoose')
const trashs=require('../Model/trashModel')


exports.addNote=async(req,res)=>{
    const {title,body}=req.body
    const cate="All Notes"
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
        if (!title || title.trim().length === 0 || !body || body.trim().length === 0 ) {
            return res.status(400).json("Title must contain at least one character.");
            
        }
        if (!body || body.trim().length === 0) {
            return res.status(400).json("Body must contain at least one character.");
        }
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

exports.recoverArchive=async(req,res)=>{
    const{title,body,category,date}=req.body
    const Nid=req.params.id
    try{
        const existingNote=await notes.findOne({title,body,category})
        if(existingNote){
            res.status(406).json("Already in your not pade!")
        }else{
            const newNote=new notes({title, body, category, date})
            await newNote.save()
            const result= await archives.findOneAndDelete({_id:Nid})
            if(result){
                res.status(200).json({newNote,result})
            }else{
                return res.status(404).json("Archive not found for deletion");
            }
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.recoverTrash = async (req, res) => {
    const { title, category, date, body } = req.body;
    const Tid=req.params.id

    try {
        if (body) {
            // Recovering as a Note
            const existingNote = await notes.findOne({ title, body });
            if (existingNote) {
                return res.status(406).json("Existing Note!!");
            } else {
                const newNote = new notes({ title, body, category, date });
                await newNote.save();
                const result=await trashs.findOneAndDelete({_id:Tid})
                res.status(200).json({newNote,result});
                console.log("Note recovered!");
            }
        } else {
            // Recovering as a Todo
            const existingTodo = await todos.findOne({ title });
            if (existingTodo) {
                return res.status(406).json("Existing Todo!!");
            } else {
                const newTodo = new todos({ title, category, date });
                await newTodo.save();
                const result=await trashs.findOneAndDelete({_id:Tid})
                res.status(200).json({newTodo,result});
                console.log("Todo Added");
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
