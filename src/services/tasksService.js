const { db } = require("../config/mongoconn.js");
//const Subscription = db.Subscription;
//const Op = db.Sequelize.Op;

const tasksTable = "tasks";

const getAll = async (res) => {
  try {
    const data = await db.Task.findAll();
   
    return data;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByID = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await db.Task.findByPk(id);

    return data;
  } catch (error) {
    return error.message ;
  }
};

const create = async (req, res) => {
  try {
    const { id, description, type, subscribed_time, creator_profit } = req.body;
    const newSubscription = await db.Task.create({
      id,
      description,
      type,
      subscribed_time,
      creator_profit,
    });

    return newSubscription;
  } catch (error) {
    return error.message ;
  }
};

const modify = async (req, res) => {
  try {
    const entityId = req.params.id;
    const { id, description, type, subscribed_time, creator_profit } = req.body;

    if (entityId == id) {
      const [updated] = await db.Subscription.update(
        { id, description, type, subscribed_time, creator_profit },
        {
          where: { id: entityId },
        }
      );

      if (updated) {
        const updatedSubscription = await db.Subscription.findByPk(entityId); 
        return updatedSubscription; 
      } else {
        return "No encontrado" ;
      }
    }
  } catch (error) {
    return error.message ;
  }
};

const remove = async (req,res) => {
  try {
    const id = req.params.id;

    const deleted = await db.Subscription.destroy({
      where: { id: id }
    });

    if (deleted) {
     return { message: 'Suscripcion eliminada correctamente' };
    } else {
      return { error: 'Suscripcion no encontrada' };
    }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getAll,
  getByID,
  create,
  modify,
  remove,
};
