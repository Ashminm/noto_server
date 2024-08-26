const trashs=require('../Model/trashModel')

exports.addTrash=async(req,res)=>{
    const{title,body,category}=req.body
    try{
        const newTrash=new trashs({title,body,category,date:Date.now()})
        await newTrash.save()
        res.status(200).json(newTrash)
    }catch(err){
        res.status(401).json("Somthing went wrong"+err)
    }
}

exports.getTrash=async(req,res)=>{
    try{
        const result=await trashs.find()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteTrash=async(req,res)=>{
    try{
        const Tid=req.params.id
        const result = await trashs.findOneAndDelete({_id:Tid})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.emptyTrash=async(req,res)=>{
    try{
        const result = await trashs.deleteMany()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}