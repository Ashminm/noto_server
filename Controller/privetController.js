const privets=require('../Model/privetModel')
const JWT=require('jsonwebtoken')

exports.createPasscode=async(req,res)=>{
    try{
    const {passcode1,passcode2,passcode3,passcode4,email}=req.body
    const ExistingPasscode=await privets.findOne({passcode1,passcode2,passcode3,passcode4,email})
    console.log(ExistingPasscode);
    

        if(ExistingPasscode){
            res.status(406).json("Already Existing Passcode!!")
        }else{
            const  newPasscode=new privets({passcode1,passcode2,passcode3,passcode4,email,date:Date.now()})
            await newPasscode.save()
            res.status(200).json(newPasscode)
        }
    }catch(err){
        res.status(401).json('Somthing went wrong:'+err)
    }
}

exports.checkPasscode=async(req,res)=>{
    try{
        const {passcode1,passcode2,passcode3,passcode4}=req.body
        const ExistingPasscode=await privets.findOne({passcode1,passcode2,passcode3,passcode4})
        if(ExistingPasscode){
            const token=JWT.sign({UserId:ExistingPasscode._id},process.env.JWT__SECRET_KEY)
            res.status(200).json({token,ExistingPasscode})
        }else{
            res.status(406).json("Invalid Passcode!!")
        }

    }catch(err){
        res.status(401).json("Somthing wet wrong:"+err)
    }
}

exports.forgotPasscode = async (req, res) => {
    const { oldPasscode, newPasscode } = req.body;

    const { passcode1, passcode2, passcode3, passcode4, email } = oldPasscode || {};
    const { passcode1: newPasscode1, passcode2: newPasscode2, passcode3: newPasscode3, passcode4: newPasscode4 } = newPasscode || {};
    // console.log("old Passcode:",oldPasscode);
    // console.log("new passcode:",newPasscode);  
    const date = Date.now();
    try {
        const existingPasscode = await privets.findOne({ passcode1, passcode2, passcode3, passcode4, email });
        // console.log("Existing:",existingPasscode); 
        if (existingPasscode) {
        
            const oldPasscodeDigit = await privets.findOne({passcode1: newPasscode1, 
                passcode2: newPasscode2, 
                passcode3: newPasscode3, 
                passcode4: newPasscode4,
                email
            })
            // console.log("OldDidit:",oldPasscodeDigit);
            
            if(oldPasscodeDigit){
                res.status(401).json("Old passcode. Please try different passcode")
            }else{
                const updatedPasscode = await privets.findOneAndUpdate(
                    { passcode1, passcode2, passcode3, passcode4, email },
                    {
                        passcode1: newPasscode1,
                        passcode2: newPasscode2,
                        passcode3: newPasscode3,
                        passcode4: newPasscode4,
                        date
                    },
                    { new: true } 
                );
                console.log("old passcode second time:", passcode1, passcode2, passcode3, passcode4, email);
                console.log("new passcode second time:", newPasscode1, newPasscode2, newPasscode3, newPasscode4, date);
    
                res.status(200).json(updatedPasscode);  
            }
            
        } else{
            res.status(401).json("Email and passcode do not match.")
        }

    } catch (err) {
        res.status(500).json("Somthing went wrong:"+err);
    }
};






