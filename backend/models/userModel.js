////  here we will create userModel to store user data in mongodb 

import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, ////   reuired means it is necessary to fill  this okey 
    email: { type: String, required: true, unique: true }, ///// unique bec email ,ust be different for each user okey 
    password: { type: String, required: true },
    cartData: { type: Object, default: {} } /// it is a cartData with empty Object 
}, { minimize: false })
///// here we used  minimize: false bec mongoDb do not allow to store the empty object to store so by using  minimize: false mongodb allow to store empty data
const userModel = mongoose.models.user || mongoose.model('user', userSchema); //// in this if userModel is present in it will be assign in ----- mongoose.models.user  if not available then it will create a new by using ------ mongoose.model('user', userSchema)


export default userModel;


