// const exp = require("express");
// const bodyParser = require('body-parser')
// const cors = require("cors");
// const multer = require("multer");
// const path = require('path');
// const WebSocket = require("ws");
// const http = require("http")


// const app = exp();
// const port = 3000;
// app.use(cors());



// app.use(bodyParser.json())

// app.use(exp.static("images"));

// // Create an HTTP server
// const server = http.createServer(app);

// const wss = new WebSocket.Server({server});



// var list = [];


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'images/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now(); // Add a unique timestamp
//         const extension = path.extname(file.originalname); // Extract file extension
//         cb(null, file.fieldname + '-' + uniqueSuffix + extension); 
//     }
//   })
// // Initialize Multer with Storage
// const upload = multer({storage:storage})

// // Route to Handle Single File Upload
// app.post('/upload', upload.single('image'), (req, res) => {
//     try {
//         // Access the uploaded file via req.file
//         console.log(req.file);
//         res.status(200).json({
//             message: 'Image uploaded successfully!',
//             image: req.file.filename
//         });
//     } catch (error) {
//         console.log(error);
        
//         res.status(400).json({ error: error.message });
//     }
// });







// app.get("/", (req, res) => {
//     res.send("Welcome to Oxdo Technologies")
// })




// app.get("/posts", (req, res) => {

//     try {
//         if (req.headers["key"] != "oxdo") throw "No heder"

//         res.send(list);

//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error);

//     }

// })

// app.post("/post", (req, res) => {

//     try {
//         if (req.headers["key"] != "oxdo") throw "No heder"
//         const post = req.body

//         console.log(Object.keys(post).length);

//         if (Object.keys(post).length < 3) {
//             throw "Error";
//         }
//         console.log(post);
//         post.id = list.length + 1;
//         list.push(post);
//         console.log(post);
//         res.send(post);
//     } catch (e) {
//         console.log(e);
//         res.status(400).send(error);

//     }
// })

// app.put("/post/:id", (req, res) => {

//     try {
//         if (req.headers["key"] != "oxdo") throw "No heder"
//         const id = req.params.id;
//         console.log("params id:- " + id);

//         const post = req.body


//         if (Object.keys(post).length < 3) {
//             throw "Error";
//         }
//         console.log("incoming post:- ");
//         console.log(post);






//         list = list.map((obj) => {
//             if (obj.id == id) {
//                 console.log("inside if " + obj.id);

//                 return post;
//             } else {
//                 console.log("outside if " + obj.id);

//                 return obj;
//             }
//         });

//         console.log("list");
//         list.forEach(v => {
//             console.log(v.title);

//         })


//         res.send(list);
//     } catch (e) {
//         console.log(e);
//         res.status(400).send(error);

//     }
// })

// app.delete("/post/:id", (req, res) => {
//     try {
//         if (req.headers["key"] != "oxdo") throw "No heder"
//         const id = req.params.id;
//         console.log(id);

//         const newList = list.filter(obj => obj.id != id);

//         list = newList;

//         res.send(list);

//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error);

//     }
// })


// app.get("/search", (req, res) => {
//     try {
//         if (req.headers["key"] != "oxdo") throw "No heder"
//         const { searchText } = req.query || "";

//         console.log(searchText);

//         const newList = list.filter((obj) => {
//             if (obj.title.includes(searchText)) {
//                 return true;
//             } else {
//                 return false;
//             }
//         })

//         res.send(newList);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error);
//     }
// })



// wss.on("connection",(ws)=>{
//     console.log("new client connected");

//     // Send a welcome message to the client
//     ws.send('Welcome to the WebSocket server!');

//      // Listen for messages from clients
//      ws.on('message', (message) => {
//         console.log(`Received: ${message}`);
//         // Echo the received message back to the client
//         ws.send(`You said: ${message}`);
//     });

//     // Handle client disconnection
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });

// })




// app.listen(port, () => console.log("App is running on port 3000"));

// server.js

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const port = 3000;

// // Create an HTTP server
// const server = http.createServer(app);

// // Create a WebSocket server
// const wss = new WebSocket.Server({ server });

// // Serve static files (optional)
// app.use(express.static('public'));


// app.get("/",(req,res)=>{
//     res.send("welcome");
// })

// // Handle WebSocket connections
// wss.on('connection', (ws) => {
//     console.log('New client connected');

//     // Send a welcome message to the client
//     ws.send('Welcome to the WebSocket server!');

//     // Listen for messages from clients
//     ws.on('message', (message) => {
//         console.log(`Received: ${message}`);
//         // Echo the received message back to the client
//         ws.send(`You said: ${message}`);
        
//     });

//     // Handle client disconnection
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// // Start the server
// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("images")); // Ensure this directory exists

// Create an HTTP server
const server = require('http').createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

let list = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now(); // Add a unique timestamp
        const extension = path.extname(file.originalname); // Extract file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Initialize Multer with Storage
const upload = multer({ storage: storage });

// Route to Handle Single File Upload
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).json({
            message: 'Image uploaded successfully!',
            image: req.file.filename
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to Oxdo Technologies");
});

app.get("/posts", (req, res) => {
    try {
        if (req.headers["key"] !== "oxdo") throw "No header";
        res.send(list);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

app.post("/post", (req, res) => {
    try {
        if (req.headers["key"] !== "oxdo") throw "No header";
        const post = req.body;

        if (Object.keys(post).length < 3) {
            throw "Error: Not enough data";
        }
        
        post.id = getTheMaxId(list)+1;
        list.push(post);
        res.send(post);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message); // Use e instead of error
    }
});

app.put("/post/:id", (req, res) => {
    try {
        if (req.headers["key"] !== "oxdo") throw "No header";
        
        const id = parseInt(req.params.id); // Convert id to integer
        const post = req.body;

        if (Object.keys(post).length < 4) {
            throw "Error: Not enough data";
        }

        list = list.map((obj) => {
            if (obj.id === id) { // Compare with id as an integer
                return { ...obj, ...post }; // Update the object with new data
            }
            return obj;
        });

        res.send(post);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message); // Use e instead of error
    }
});

app.delete("/post/:id", (req, res) => {
    try {
        if (req.headers["key"] !== "oxdo") throw "No header";
        
        const id = parseInt(req.params.id); // Convert id to integer
        list = list.filter(obj => obj.id !== id);

        res.send(list);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

app.get("/search", (req, res) => {
    try {
        if (req.headers["key"] !== "oxdo") throw "No header";
        
        const { searchText } = req.query || "";
        
        const newList = list.filter((obj) => obj.title.includes(searchText));
        
        res.send(newList);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

// Store connected clients
const clients = new Set();

wss.on("connection", (ws,req) => {
    console.log("New client connected");

    console.log(req.headers["name"]);
    

    clients.add(ws);

    ws.send('Welcome to the WebSocket server!');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        
        
        //ws.send(`You said: ${message}`);

        broadcast(`Received: ${message}`)
        

    });

    ws.on('close', () => {
        console.log('Client disconnected');
        
        clients.delete(ws);
    });
});

// Function to broadcast a message to all clients
function broadcast(message) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

// Start the HTTP server
server.listen(3001, () => console.log("App is running on port 3001"));


function getTheMaxId(list){
    const maxId = list.reduce((max, item) => item.id > max ? item.id : max, 0);

    console.log("Maximum ID:", maxId);
    return maxId;
}