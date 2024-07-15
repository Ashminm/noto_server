const mongoose=require('mongoose')

const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log("Connection Established.(Atles)!!");
}).catch((err)=>{
    console.log(err);
})