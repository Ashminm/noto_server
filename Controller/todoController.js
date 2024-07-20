const todos=require('../Model/todoModel')

exports.addTodo=async(req,res)=>{
    const {title}=req.body
    const cat="New"
    try{
        const existingTodo=await todos.findOne({title})
        if(existingTodo){
            res.status(406).json("Existing task!!")
        }else{
            const newTodo=new todos({title,category:cat,date:Date.now()})
            await newTodo.save()
            res.status(200).json(newTodo)
        }
    }catch(err){
        res.status(401).json("Somthing went wrong:"+ err)
    }
}

exports.getAllTodo=async(req,res)=>{
    try{
        const Result=await todos.find()
        res.status(200).json(Result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getSingleTodo=async(req,res)=>{
    try{
        const Result=await todos.findOne({_id:req.params.id})
        console.log(_id);
        res.status(200).json(Result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.Deletetodo=async(req,res)=>{
    try{
        const Tid=req.params.id
        const Result=await todos.findOneAndDelete({_id:Tid})
        res.status(200).json(Result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.EditTodo=async(req,res)=>{
    const Tid=req.params.id
    const {title}=req.body
    const date=Date.now()
    try{
        const existingTodo=await todos.findOne({title})
        if(existingTodo){
            res.status(406).json("Already Exist the Task!!")
        }else{
            const Result=await todos.findByIdAndUpdate({_id:Tid},{title,date})
            res.status(200).json(Result)
        }
    }catch(err){
        res.status(401).json(err)
    }
}