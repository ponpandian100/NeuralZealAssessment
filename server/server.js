const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: 1, username: 'user1', password: 'pass1', projects: [1, 2] },
  { id: 2, username: 'user2', password: 'pass2', projects: [2, 3] },
];

let projects = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 2' },
  { id: 3, name: 'Project 3' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/',(req,res)=>{
      res.send("working...");
});

app.get('/projects', (req, res) => {
  const { userId } = req.query;
  const user = users.find(u => u.id == userId);
  if (user) {
    const userProjects = projects.filter(p => user.projects.includes(p.id));
    res.json(userProjects);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
