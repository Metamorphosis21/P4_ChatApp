import express from "express";

const app = express()

app.get("/", (req, res)=>{
    res.send("Tu hai kon r e")
    
})

app.listen(3000, ()=>{
    console.log("App is running on PORT 3000");
})