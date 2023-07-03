const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require("../models")
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
  isAdmin_backup = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };

  isAdmin = (req, res, next) => {
    User.findById(req.userId)
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
  
        Role.find({ _id: { $in: user.roles } })
          .exec()
          .then((roles) => {
            if (!roles) {
              return res.status(403).send({ message: "Require Admin Role!" });
            }
  
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "admin") {
                next();
                return;
              }
            }
  
            res.status(403).send({ message: "Require Admin Role!" });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
  
  isModerator_backup = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  };

  isModerator = (req, res, next) => {
    User.findById(req.userId)
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
  
        return Role.find({ _id: { $in: user.roles } }).exec();
      })
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
  
        res.status(403).send({ message: "Require Moderator Role!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  };
  
  
  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
  };
  module.exports = authJwt;