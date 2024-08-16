
const userModel = require('../model/userModels')



const create = async (req,res)=>{
        try{
                const userData = req.body;

                if(!userData){
                return res.status(400).json({msg:"No User Data"});
                }
                let newUser = await userModel.create(userData);
                res.status(200).json(newUser);
        }catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            } 
};

const getAll =  async(req,res) =>{
        try{
        const  userData = await userModel.find();

        if(!userData){
                return res.status(404).json({ msg : "Unauthorized Access!"})
        }
        res.status(200).json(userData);
        
        }catch(error){
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }

}

// for get particular data

const getOne =  async (req , res )=>{
        try{
                const id = req.params.id;
                const userExist = await userModel.findById(id);
                
                //checking the validity of the id or not
                if (!userExist ) {
                    return res.status(404).json({ msg: "Invalid User ID." })
                }
                res.status(200).json(userExist);

        }catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}

const  update= async(req , res)=>{

        try{
             const id = req.params.id;
             const userExist = await userModel.findById(id);

             if (!userExist ) {
                return res.status(404).json({ msg: "Invalid User ID." });
            }

             const updateData = await userModel.findByIdAndUpdate(id , req.body , {new:true});
             
                res.status(200).json(updateData);

        }catch(error){
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}

const deleteUser = async (req, res) => {

        try{
                const id = req.params.id;
                const userExist = await userModel.findById(id);

                if(!userExist){
                        return res.status(404).json({msg:"No user with this id"})
                }
                await userModel.findByIdAndDelete(id);
                res.status(200).json({msg: "User has been deleted!"});

        }catch(error){
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' }); 
        }
}

 module.exports = {create, getAll, getOne, update, deleteUser}


// app.use("/api", router);