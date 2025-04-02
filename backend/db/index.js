const mongoose = require("mongoose");
const express = require("express");
const { boolean } = require("zod");
mongoose.connect("mongodb+srv://<your_username>:<your_password>@cluster0.96nmh.mongodb.net/todo");

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todo',todoSchema);

module.exports = todo;