import express from "express";

const app = express()

app.get("/", (req, res)=>{
    res.send("Tu hai ke")
    
})

app.listen(3000, ()=>{
    console.log("App is running on PORT 3000");
})