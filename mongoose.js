const mongoose=require('mongoose');

async function dbConnect(){
    await mongoose.connect(`mongodb+srv://rb465629:Priceless65018@rajat.jqsamga.mongodb.net/?retryWrites=true&w=majority`);
    console.log('database connected successfully');
}
dbConnect();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    }
});

const userModel=mongoose.model('users',userSchema);

const userService={};

userService.createUser=async(payload)=>{
    return await new userModel(payload).save();
};

userService.findOneUser=async(searchQuery,projectionQuery)=>{
    return await userModel.findOne(searchQuery,projectionQuery);
};

async function signup(payload){
    if(await userService.findOneUser({email:payload.email})){
        return res.json({message:'User already exist'});
    }
    userService.createUser(payload);
};
const payload={
    name:"rajat",
    email:"rb465629@gmail.com",
    contact:"987110"
}
signup(payload);