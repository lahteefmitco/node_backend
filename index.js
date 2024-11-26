const exp = require("express");
const bodyParser = require('body-parser')
const app = exp();

app.use(bodyParser.json())

var list = [];




app.get("/posts", (req, res) => {
    res.send(list);
})

app.post("/post", (req, res) => {

    try {
        const post = req.body

        console.log(Object.keys(post).length);

        if (Object.keys(post).length < 3) {
            throw "Error";
        }
        console.log(post);
        post.id = list.length + 1;
        list.push(post);
        console.log(post);
        res.send(post);
    } catch (e) {
        console.log(e);
        res.status(400).send("Error");
    }
})

app.put("/post/:id", (req, res) => {

    try {
        const id = req.params.id;
        console.log(id);

        const post = req.body

        console.log(Object.keys(post).length);

        if (Object.keys(post).length < 3) {
            throw "Error";
        }
        console.log(post);

        console.log(post.userId);



        list = list.map((obj) => {
            if (obj.id == id) {
                console.log("inside if " + obj.id);

                return post;
            } else {
                console.log("outside if " + obj.id);

                return obj;
            }
        });

        res.send(list);
    } catch (e) {
        console.log(e);
        res.status(400).send("Error");
    }
})

app.delete("/post/:id", (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const newList = list.filter(obj => obj.id === id);

        res.send(newList);

    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
})


app.get("/search",(req,res)=>{
    try {
        const {searchText} = req.query || "";

        console.log(searchText);

        const newList = list.filter((obj)=>{
            if(obj.title.includes(searchText)){
                return true;
            }else{
                return false;
            }
        })
        
        res.send(newList);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error"); 
    }
})




app.listen(3000, () => console.log("App is running on port 3000"));