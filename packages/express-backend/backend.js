// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"].toLowerCase() === name
  );
};

// my name and job filter helper function
const filterUsers = (name, job) => {
  return users["users_list"].filter(
    (user) => 
      user["job"].toLowerCase() === job.toLowerCase() && 
      user["name"].toLowerCase() === name.toLowerCase()
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name == undefined && job == undefined) {
    res.send(users);
  } else {
    let result;
    if (job != undefined) {
      result = filterUsers(name, job);
      result = { users_list: result };
    }else{
      let nameResult = findUserByName(name);
      result = { users_list: nameResult };
    }
    
    res.send(result);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// my custom stuff
app.delete("/users/:id", (req, res) =>{
  const id = req.params["id"];
  let result = findUserById(id);
  let x = users["users_list"].indexOf(result);
  users["users_list"].splice(x,1);
  res.send();
});

// end my custom stuff

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});