const Task = require('../model/taskModel.js');

const addTask = async (req, res) => {
    console.log("Task add from here",req.body);
    try {
        const newTask = new Task(req.body);
        const result = await newTask.save();
        return res.status(200).send({ message : "Task added successfully", task: result});
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getAllTasks = async(req, res) => {
    console.log("show get all tasks");
    try {
        result = await Task.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteTask = async(req, res) => {
    // console.log("Call the req.params.id",req.params.id);
    // console.log("call req.body",req.body);
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id, req.body);
        if (!tasks){
            res.status(400).send({ message : "Task are Not Found"});
        }
        res.send({task : tasks, message : "Task Deleted Successfully..."});
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateTask = async(req, res) => {
    console.log(req.params.id);
    console.log("Check Update Task req.body",req.body);
    try {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!tasks){
        res.status(400).send({message:"Task Not Found"});
    }
    res.status(200).send({message : "Task Updated Successfully...",task : tasks});
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask
};