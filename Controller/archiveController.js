const archives=require('../Model/archiveModel')
const notes=require('../Model/noteModel')

exports.addArchive=async(req,res)=>{
    const{title,body,category,date}=req.body
    const Aid=req.params.id
    try{
        const existingArchive=await archives.findOne({title,body,category})
        if(existingArchive){
         res.status(406).json("Existing Archive note!")   
        }else{
            const newArchive=new archives({title,body,category,date})
            await newArchive.save()
            const result=await notes.findOneAndDelete({_id:Aid})
            if(result){
                res.status(200).json({newArchive,result})
            }else{
                return res.status(404).json("Note not found for deletion");
            }
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getArchive=async(req,res)=>{
    try{
        const result=await archives.find()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getSingleArchive=async(req,res)=>{
    try{
        const result = await archives.findOne({_id:req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}