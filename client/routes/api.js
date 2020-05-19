/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var express = require("express");
var mongoose = require("mongoose");
require('dotenv').config();

let thread = require("../models/thread.js").thread;
let reply = require("../models/reply.js").reply;
/*
const CONNECTION_STRING = process.env.MONGO_DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
*/
module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .get(function(req, res) {
      thread
        .find({ board: req.params.board })
        .sort({ bumped_on: -1 })
        .limit(10)
        .exec(function(err, data) {
          res.json(
            data.map(thread => ({
              _id: thread._id,
              text: thread.text,
              created_on: thread.created_on,
              bumped_on: thread.bumped_on,
              replies:
                thread.replies.length > 3
                  ? thread.replies.slice(-3).map(val => ({
                      _id: val._id,
                      text: val.text,
                      created_on: val.created_on
                    }))
                  : thread.replies.map(val => ({
                      _id: val._id,
                      text: val.text,
                      created_on: val.created_on
                    })),
              replycount: thread.replies.length
            }))
          );
        });
    })

    .post(function(req, res) {
      var newThread = new thread({
        board: req.body.board ? req.body.board : req.params.board,
        text: req.body.text,
        created_on: new Date(),
        bumped_on: new Date(),
        reported: false,
        delete_password: req.body.delete_password
      });
      newThread.save(function(err) {
        if (err) return console.error(err);
      });
      res.redirect(
        "/b/" + (req.body.board ? req.body.board : req.params.board) + "/"
      );
    })

    .put(function(req, res) {
      console.log(req.params.thread_id);
      thread.findByIdAndUpdate(
        { _id: req.body.report_id },
        { reported: true },
        (err, data) => {
          if (err) {
            res.send("incorrect thread id");
          } else {
            res.send("success");
          }
        }
      );
    })

    .delete(function(req, res) {
      thread.findOneAndDelete(
        { _id: req.body.thread_id, delete_password: req.body.delete_password },
        (err, data) => {
          if (data == undefined) {
            res.send("incorrect password");
          } else {
            res.send("success");
          }
        }
      );
    });

  app
    .route("/api/replies/:board")

    .get(function(req, res) {
      thread.findOne({ _id: req.query.thread_id }, (err, data) => {
        if (err) console.log(err);
        res.json(data);
      });
    })

    .post(function(req, res) {
      let filter = { _id: req.body.thread_id };

      var newReply = new reply({
        thread_id: req.body.thread_id,
        text: req.body.text,
        created_on: new Date(),
        bumped_on: new Date(),
        reported: false,
        delete_password: req.body.delete_password
      });

      thread.updateOne(
        filter,
        { $push: { replies: newReply } },
        { new: true },
        (err, data) => {
          if (err) {
            alert("Could not update " + filter + " " + err);
          } else {
            res.redirect("/b/" + req.params.board + "/" + req.body.thread_id);
          }
        }
      );
    })

    .put(async function(req, res) {
      const { thread_id, reply_id } = req.body;

      thread.findOne({ _id: thread_id }, (err, foundThread) => {
        if (err) return console.log(err);

        var newThread = new thread(foundThread);

        let foundReply = newThread.replies.filter(val =>
          val._id.equals(reply_id)
        )[0];

        foundReply.reported = true;

        newThread.save(function(err) {
          if (err) return console.error(err);
        });

        res.send("success");
      });
    })

    .delete(function(req, res) {
      thread.updateOne(
        {
          _id: req.body.thread_id
        },
        {
          $pull: {
            replies: {
              delete_password: req.body.delete_password
            }
          }
        },
        (err, data) => {
          if (data == undefined) {
            res.send("incorrect password");
          } else {
            res.send("success");
          }
        }
      );
    });
};
