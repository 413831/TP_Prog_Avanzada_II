const express = require('express');
const Task = require('../models/Task');

module.exports = {
  getAll: async (req, res ) => getAllTasks(req,res),
  getByID: async (req, res ) => getTaskByID(req,res),
  create: async (req, res ) => createTasks(req,res), 
  modify: (req, res ) => modifyTask(req,res), 
  delete: (req, res ) => deleteTask(req,res), 
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getTaskByID(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function createTasks(req, res) {
  try {
    const { title, detail, priority, dependency, owner, status } = req.body;

    const response = await Task.create({
      title: title,
      detail: detail,
      priority: priority,
      dependency: dependency,
      owner: owner,
      status: status,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function modifyTask(req, res) {
  try {
    const { id, title, detail, priority, dependency, owner, status } = req.body;
    const documentID = req.params.id

    if (documentID == id) {
      const response = await Task.replaceOne({ _id: documentID }, {
        title: title,
        detail: detail,
        priority: priority,
        dependency: dependency,
        owner: owner,
        status: status,
      });
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function deleteTask(req, res) {
  try {
    const { id, status } = req.body;
    const documentID = req.params.id

    console.log("DELETE")
    console.log(documentID)

    if (documentID == id) {
      const response = await Task.updateOne({ _id: id }, { status: status });
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
