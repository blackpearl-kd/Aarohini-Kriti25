const express= require("express")
const app= express()
const path= require("path")
const hbs=require("hbs")
// const collection=require("./mongoDB")
// const Item = require("./mongoDB")
const { collection, Item,Consumer,Tweet } = require("./mongoDB");

const templelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view endine","hbs")
app.set("views",templelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("index.hbs")
})
app.get("/farmerSignup",(req,res)=>{
    res.render("farmerSignup.hbs")
})
app.get("/consumerSignup",(req,res)=>{
    res.render("consumerSignup.hbs")
})
app.get("/farmerlogin",(req,res)=>{
    res.render("farmerlogin.hbs")
})
app.get("/consumerlogin",(req,res)=>{
    res.render("consumerlogin.hbs")
})
app.get("/FarmerDashboard",(req,res)=>{
    res.render("FarmerDashboard.hbs")
})
app.get("/consumerDashboard",(req,res)=>{
    res.render("consumerDashboard.hbs")
})
app.get("/farmersell",(req,res)=>{
    res.render("farmersell.hbs")
})
app.get("/farmerweather",(req,res)=>{
    res.render("farmerweather.hbs")
})
app.get("/farmercomm",(req,res)=>{
    res.render("farmercomm.hbs")
})

app.post("/farmerSignup",async (req,res)=>{
    
    const data={
        email:req.body.email,
        pass:req.body.pass
    }
    
    await collection.insertMany([data])
    res.render("FarmerDashboard.hbs")
})
app.post("/farmerlogin",async (req,res)=>{
    try {
        console.log(collection)
        const check= await collection.findOne({email:req.body.email})
        if(check.pass==req.body.pass){
            res.render("FarmerDashboard.hbs")
        }
        else{
            res.send("Wrong Password")
        }
        
    } 
    catch {
        // console.log(check);
        res.send("Wrong Details")
    }
})
// Consumer Signup
app.post("/consumerSignup", async (req, res) => {
    try {
        const data1 = {
            email: req.body.email,
            pass: req.body.pass,
        };
        await Consumer.insertMany([data1]);
        res.render("consumerDashboard.hbs"); // Redirect to consumer dashboard
    } catch (error) {
        console.error("Error during consumer signup:", error);
        res.status(500).send("Error during signup");
    }
});

// Consumer Login
app.post("/consumerLogin", async (req, res) => {
    try {
        const checkConsumer= await Consumer.findOne({email:req.body.email})
        const items = await Item.find({}); 
        if(checkConsumer.pass==req.body.pass){
            res.render("consumerDashboard.hbs", { items })
        }
        else{
            res.send("Wrong Password")
        }
        
    } 
    catch {
        // console.log(check);
        res.send("Wrong Details")
    }
});
app.post("/farmersell", async (req, res) => {
    const itemdata={
        name: req.body.itemName,
        price: req.body.itemPrice,
        quantity: req.body.itemQuantity,
        description: req.body.itemDescription,
    }
    await Item.insertMany([itemdata])
    res.render("farmersell.hbs");
})
app.post("/farmercomm", async (req, res) => {
    const tweetdata={
        description: req.body.description,
    }
    await Tweet.insertMany([tweetdata])
    res.render("farmercomm.hbs");
})


app.get("/consumer", async (req, res) => {
    try {
        const items = await Item.find({}); // Fetch all items from the database
        res.render("consumer.hbs", { items }); // Pass the items to the consumer view
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Error fetching items");
    }
})

app.listen(3000,()=>{
    console.log("PORT connected");
}) 

