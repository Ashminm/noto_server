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