const express =  require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotEnv=require('dotenv').config(); 

const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("./public"))  
app.use(express.json())


app.get("/",(req,res)=>{
    res.json({message:"All set"})
}) 

const foodRecepie = mongoose.model("foodRecepie",{
    recepieName : String,
    recepieTime : String,
    ingredients : [String],
    serves : String
}) 

app.get("/recepie",(req,res)=>{
    foodRecepie.find()
        .then(
            (food)=>{
                res.json(food)
            }
        ).catch((err)=>{
            res.json({message:"Something went wrong"})
        })
})

app.post("/recepie",(req,res)=>{

    const { recepieName, recepieTime, ingredients, serves } = req.body;
    console.log( ingredients)
    const newRecepie = new foodRecepie({
        recepieName : recepieName,
        recepieTime : recepieTime,
        ingredients : ingredients,
        serves : serves
    }) 

    newRecepie.save()
                .then((food)=>{
                    res.json(food)
                }).catch((err)=>{
                    res,json({error:"Something went wrong"})
                })
})

app.patch('/recepie/:id',(req,res)=>{
    let {id} = req.params;
   foodRecepie.findByIdAndUpdate(id,
    req.body)
    .then((food)=>{
        res.json({message:"Updated succesfully"})
    }).catch((err)=>{
        res.json({message:"Something went wrong"})
    })
})

app.delete('/recepie/:id',(req,res)=>{
    let {id} = req.params;
   foodRecepie.findByIdAndDelete(id)
    .then((food)=>{
        res.json({message:"Updated succesfully"})
    }).catch((err)=>{
        res.json({message:"Something went wrong"})
    })
})

app.listen(3000,()=>{
    console.log("Running on port http://localhost:3000");
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>console.log("Database Connect Sucessfully"))
    .catch((err)=>console.log(err))
})