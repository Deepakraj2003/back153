import express from "express";
import path from "path";
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";

const app = express()

// Connection URL
const url = "mongodb+srv://deera3468:wQYHszmzEZiYK4tD@back153.i8nqqzc.mongodb.net/?retryWrites=true&w=majority&appName=back153";
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
await client.connect();
console.log('Mongodb Connected successfully to server');

//middleware
app.use(express.json())



app.get('/', (req, res) => {
    const filePath = path.resolve('src','k.html');
    console.log("sdfghjh");
    res.sendFile(filePath);
});
app.post('/post' ,async(req, res) => {
    const getPostman=req.body;
    console.log(getPostman);
    const sendMethod=await client.db("CURD").collection("data").insertOne(getPostman);
    res.send(sendMethod);
});
app.post('/postmany',async(req, res) => {
    const getPostman=req.body;
    console.log(getPostman);
    const sendMethod=await client.db("CURD").collection("data").insertMany(getPostman);
    res.send(sendMethod);
});

app.get('/getmany',async (req,res)=>{
    const getdata= await client.db("CURD").collection("data").find({}).toArray();
    res.send(getdata);
});

app.get('/getone/:id', async (req, res) => {
    const { id } = req.params;
    const getdata = await client.db("CURD").collection("data").findOne({_id:new ObjectId(id)});
    res.send(getdata);
});

//update

app.put('/update/:id', async (req, res) => {
    const {id}=req.params;
    const getpostman=req.body;
    const updatedata = await client.db("CURD").collection("data").updateOne({_id:new ObjectId(id)},{$set:getpostman});
    res.send(updatedata);
});

//delete

app.delete('/delete/:id', async (req, res)=>{
    const {id}=req.params;
    const deletedata = await client.db("CURD").collection("data").deleteOne({_id:new ObjectId(id)});
    res.send(deletedata);
})



app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});


