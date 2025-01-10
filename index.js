const express = require('express');
let users = require('./MOCK_DATA.json');
const fs = require("fs");
// let users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8005;

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
//To list all the users
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(user){
        return res.json(user);
    } else{
        return res.status(404).json({message: "User not found"});
    }
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.findIndex((user) => user.id === id);

    if (user === -1){
        return res.status(404).json({message: "User not found"});
    }
    const updatedUser = {...users[user], ...req.body};

    users[user] = updatedUser;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if(err){ 
        return res.status(500).json({status: "error", message:"Failed to save data"})
      }
      return res.json({status: "success", user:updatedUser});
    });
})

.delete((req, res) => {
   const id = Number(req.params.id);
   const user = users.findIndex((user) => user.id === id);

   if(user === -1){
    return res.status(505), json({message: "User not found"})
   }

   const deleteUser = users[user];
   users = users.filter((user) => user.id !== id);

   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if(err){ 
      return res.json({status: "error", message:"Failed to delete data"});
    }
    return res.json({status: "success", user:deleteUser});
  });
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({status: "success", id: users.length});
    });
});



app.listen(PORT, () => console.log("Server has started"));