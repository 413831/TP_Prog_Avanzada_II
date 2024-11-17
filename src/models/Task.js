const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  detail: { type: String, required: true },
  priority: { type: Number, required: true },
  dependency: { type: String, required: false },
  owner: { type: String, required: true },
  status: {type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);