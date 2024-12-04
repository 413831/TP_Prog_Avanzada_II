const express = require('express');

module.exports = {
  getAll: async (req, res) => getAllUsers(req, res),
  getByID: async (req, res) => getUserByID(req, res),
  create: async (req, res) => createUsers(req, res),
  modify: (req, res) => modifyUser(req, res),
  delete: (req, res) => deleteUser(req, res),
}

async function getAllUsers(req, res) {
  try {
    const User = require('../models/User')
    const Users = await User.find();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getUserByID(req, res) {
  try {
    const User = require('../models/User')
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function createUsers(req, res) {
  try {
    const {  email, password, username, status, role } = req.body;

    const User = require('../models/User')
    const response = await User.create({
      email: email,
      password: password,
      username: username,
      status: status,
      role: role,
    });
    res.json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function modifyUser(req, res) {
  try {
    const { id, title, detail, priority, dependency, owner, status } = req.body;
    const documentID = req.params.id

    if (documentID == id) {
      const response = await User.replaceOne({ _id: documentID }, {
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

async function deleteUser(req, res) {
  try {
    const { id, status } = req.body;
    const documentID = req.params.id

    console.log("DELETE")
    console.log(documentID)

    if (documentID == id) {
      const User = require('../models/User')
      const response = await User.updateOne({ _id: id }, { status: status });
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
