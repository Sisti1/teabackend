const mongoose =require('mongoose');
const userSchema =mongoose.Schema({
    fname:{String,required:true,trim:true},
    lname:{String,required:true,trim:true},
    email:{String,required:true,trim:true},
    password:{String,required:true,trim:true},
    email: {
        type: String,
        required: [true, 'please enter ur email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },

})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    next();
})
userSchema.pre('save',function(next){
    if(!this.modified('password')|| this.isNew) return next();
    this.passwordChangedAt =Date.now()-1000;
    next
})
userSchema.methods.correctPassword=async function(userPassword,password){
    return await bcrypt.compare(userPassword,password);
}
const User=new mongoose.model('User',userSchema);
module.exports=User;