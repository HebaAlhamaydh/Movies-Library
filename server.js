
const express=require('express');
const res = require('express/lib/response');

const recipesData=require("./Movie Data/data.json");
const app=express();
const port=3000;
app.get("/",handleHomePage)
app.get("/favorite",  handleFavorite)

 function handleError500(req,res) {
    if(req.staus=500)
    res.status(500).send({
        "status": 500,
        "responseText": "Sorry, something went wrong"
        });
 } 
 function handleError404(req,res) {
    if(req.staus=404)
    res.send({
        "status": 404,
        "responseText": "page not found error"
        });
 } 

function handleFavorite(req,res)
{
    res.send("Welcome to Favorite Page");
}

function handleHomePage(req,res){
let recip=new Recipe("Spider-Man: No Way Home","/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg","Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.")
res.send(recip);
}
//creating a rout 
//app.method
app.listen(port,()=>{
console.log("server is running")
})
function Recipe(title,poster_path,overview)
{   this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}