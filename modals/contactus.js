const express = require("express")
const mongoose=require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors');
const user= require("./routes/users")

//Model 
const contactUs=require("./models/contact_us")
const app = express()
app.use(express.json())
app.use(cors());
mongoose.connect("mongodb+srv://Srishti:keshav123@cluster0.u87vkyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("Mein srishti ke andar hun "))
app.listen(5600,()=>{
    console.log("SUN RHA HUN MEIN 5600 PR")
})
//Checking If the API is working or not 
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.use("/user", user);  
app.post('/postContactUs',async(req,res)=>{
    try{
        const addContactUs=new contactUs(req.body)
        await addContactUs.save()
        res.json({success:true,data:addContactUs})
    }
    catch(e){
        console.log(e)
    res.status(500).json({data:[],error:err})

    }
})