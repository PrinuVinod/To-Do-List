const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();

router.use((req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.id;
    next();
});

router.get('/', async (req, res) => {
    const todos = await Todo.find({
        userId: req.userId
    });
    res.json(todos);
});

router.post('/', async (req, res) => {
    const {
        text
    } = req.body;
    const newTodo = new Todo({
        userId: req.userId,
        text,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
});

router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        text,
        completed
    } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate({
        _id: id,
        userId: req.userId
    }, {
        text,
        completed
    }, {
        new: true
    });
    res.json(updatedTodo);
});

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    await Todo.findOneAndDelete({
        _id: id,
        userId: req.userId
    });
    res.status(204).end();
});

module.exports = router;
