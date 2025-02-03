const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Kriti2025Startup")
.then(()=>{
    console.log("COnnECTED")
})
.catch(()=>{
    console.log("ERR")
})
const LogInSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    pass:{
        type:String,
        required:true
    }
})
const ItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    price: {
        type:Number,
        required:true 
    },
    quantity: {
        type:Number,
        required:true 
    },
    description: {
        type:String,
        required:true 
    },
})
const ConsumerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    pass: {
        type: String,
        required: true,
    },
});
const TweetSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
});

const Consumer = new mongoose.model("Consumer", ConsumerSchema);
const Tweet = new mongoose.model("Tweet", TweetSchema);
const collection= new mongoose.model("Collection1",LogInSchema)
const Item = new mongoose.model("Item1", ItemSchema);
module.exports = {
    collection,
    Item,
    Tweet,
    Consumer
};

