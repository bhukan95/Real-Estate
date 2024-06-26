import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
            type:String,
            required:true,
            unique:true,
    },email: {
        type:String,
        required:true,
        unique:true,
},password: {
    type:String,
    required:true,
    
},
avatar:{
    type:String,
    default:"https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"
},
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;