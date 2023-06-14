let controller_name = "user";
let object_name = "user";
let objects_name = "users";

// require the jsonwebtoken package
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let Model = require(`../models/${object_name}.model`);

module.exports = {
  register: async (req, res) => {
    const { user_name, user_email, user_password } = req.body;

    try {
      const new_user = new Model({
        user_name,
        user_email,
        user_password,
      });

      await new_user.save();

      return res.status(200).json({
        success: true,
        message: "success to register user",
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in register",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;

      const user = await Model.findOne({ user_email });

      if (!user) {
        throw new Error("bad email");
      }

      const equal = await bcrypt.compare(user_password, user.user_password);

      if (!equal) {
        throw new Error("bad password");
      }

      const data = {
        user_id: user._id,
      };

      const token = await JWT.sign(data, "secretText", { expiresIn: "10m" });


      return res.status(201).json({
        success: true,
        message: "success login user",
        token,
      });
    } catch (error) {
      return res.status(401).json({
        message: `error in login user request`,
        error: error.message,
      });
    }
  },

  authUser: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw new Error("not access");
      }

      const decode = await JWT.verify(token, "secretText");

      if (!decode) {
        throw new Error("not access");
      }

      const user = await Model.findById(decode.user_id, "user_name user_email");

      if (!user) {
        throw new Error("not access");
      }

      return res.status(201).json({
        success: true,
        message: "success to auth user",
        user,
      });
    } catch (error) {
      return res.status(401).json({
        message: `error in auth user request`,
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const models = await Model.find();

      return res.status(200).json({
        success: true,
        message: `success to find all ${objects_name}`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get all ${objects_name}`,
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const models = await Model.findById(req.params.id);

      return res.status(200).json({
        success: true,
        message: `success to find ${controller_name} by id`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in find ${controller_name} by id}`,
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    try {
      const id = req.params.id;

      await Model.findByIdAndUpdate(id, req.body);

      return res.status(200).json({
        success: true,
        message: `success to update ${controller_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update ${controller_name} by id`,
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const id = req.params.id;

      await Model.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: `success to delete ${controller_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete ${controller_name} by id`,
        error: error.message,
      });
    }
  },
};
