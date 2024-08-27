const archives=require('../Model/archiveModel')
const notes=require('../Model/noteModel')

exports.addArchive=async(req,res)=>{
    const{title,body,category}=req.body
    const Aid=req.params.id
    try{
        const existingArchive=await archives.findOne({title,body,category})
        if(existingArchive){
         res.status(406).json("Existing Archive note!")   
        }else{
            const newArchive=new archives({title,body,category,date:Date.now()})
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