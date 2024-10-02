import express from 'express'
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import {tasks} from "./tasks";

const app = express();
app.use(cors());

app.use(express.json())

const PORT = process.env.PORT || 8080;


app.get('/tasks', (_req, res) => {
  res.send(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    res.send(task);
  } else {
    res.sendStatus(404);
  }
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.send(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        res.send(updatedTask);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
  console.log(`Starting process at ${PORT}`);
});
