const exp = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const multer = require("multer");
const path = require('path');


const app = exp();
app.use(cors());



app.use(bodyParser.json())

app.use(exp.static("images"));

var list = [];


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now(); // Add a unique timestamp
        const extension = path.extname(file.originalname); // Extract file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); 
    }
  })
// Initialize Multer with Storage
const upload = multer({storage:storage})

// Route to Handle Single File Upload
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        // Access the uploaded file via req.file
        console.log(req.file);
        res.status(200).json({
            message: 'Image uploaded successfully!',
            image: req.file.filename
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});







app.get("/", (req, res) => {
    res.send("Welcome to Oxdo Technologies")
})




app.get("/posts", (req, res) => {

    try {
        if (req.headers["key"] != "oxdo") throw "No heder"

        res.send(list);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);

    }

})

app.post("/post", (req, res) => {

    try {
        if (req.headers["key"] != "oxdo") throw "No heder"
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
        res.status(400).send(error);

    }
})

app.put("/post/:id", (req, res) => {

    try {
        if (req.headers["key"] != "oxdo") throw "No heder"
        const id = req.params.id;
        console.log("params id:- " + id);

        const post = req.body


        if (Object.keys(post).length < 3) {
            throw "Error";
        }
        console.log("incoming post:- ");
        console.log(post);






        list = list.map((obj) => {
            if (obj.id == id) {
                console.log("inside if " + obj.id);

                return post;
            } else {
                console.log("outside if " + obj.id);

                return obj;
            }
        });

        console.log("list");
        list.forEach(v => {
            console.log(v.title);

        })


        res.send(list);
    } catch (e) {
        console.log(e);
        res.status(400).send(error);

    }
})

app.delete("/post/:id", (req, res) => {
    try {
        if (req.headers["key"] != "oxdo") throw "No heder"
        const id = req.params.id;
        console.log(id);

        const newList = list.filter(obj => obj.id != id);

        list = newList;

        res.send(list);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);

    }
})


app.get("/search", (req, res) => {
    try {
        if (req.headers["key"] != "oxdo") throw "No heder"
        const { searchText } = req.query || "";

        console.log(searchText);

        const newList = list.filter((obj) => {
            if (obj.title.includes(searchText)) {
                return true;
            } else {
                return false;
            }
        })

        res.send(newList);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})




app.listen(3000, () => console.log("App is running on port 3000"));