import express, { RequestHandler } from "express";
import { Todo } from "../models/Todo";

const router = express.Router();

// Get all todos
const getAllTodos: RequestHandler = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// Create a new todo
const createTodo: RequestHandler = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: "Error creating todo" });
  }
};

// Toggle todo completion
const toggleTodo: RequestHandler = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Error updating todo" });
  }
};

// Delete a todo
const deleteTodo: RequestHandler = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting todo" });
  }
};

router.get("/", getAllTodos);
router.post("/", createTodo);
router.patch("/:id", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
